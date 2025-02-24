import { Schema, model } from 'mongoose';
import {
  TStudent,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TUserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'This first name field is required'],
    trim: true,
    maxlength: [
      20,
      'Max allowed length is 20- first name cannot be more than 20 characters',
    ],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitilize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Lase Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'This FatharName field is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'This fatherOccupation field is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'This fatherContactNo field is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'This motherName field is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'This motherOccupation field is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'This motherContactNo field is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'This localGuardianSchema field is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'This occupation field is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'This contactNo field is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'This address field is required'],
  },
});

// studentSchema model...............................
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID must be required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'This name field is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid.',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'This dateOfBirth field is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: ' ({VALUE}) -Your provided email is not valid',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'This contactNo field is required'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'This emergencyContactNo field is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: [true, 'This guardian field is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'This localGuardian field is required'],
    },
    profileImg: { type: String, default: '' },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// model for the student
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
