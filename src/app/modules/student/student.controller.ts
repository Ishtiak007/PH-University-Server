import { Request, Response } from 'express';
import { studentServices } from './student.services';
// import studentvalidationSchema from './student.joi.validation';
import { z } from 'zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using ZOD
    const studentValidationSchema = z.object({
      id: z.string(),
      name: z.object({
        firstName: z
          .string()
          .max(20, {
            message: 'First Name can not be more than 20 characters',
          }),
      }),
    });

    const { student: studentData } = req.body;

    // data validation using JOI
    // const { error } = studentvalidationSchema.validate(studentData);

    const result = await studentServices.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went worng',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went worng',
      error: err,
    });
  }
};

// get all students from db
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// get single student from db
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getASingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Signle student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
