import { RequestHandler } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// get all students from db
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDb(req.query);

  res.status(200).json({
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

// get single student from db
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.getASingleStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Signle student is retrieved successfully',
    data: result,
  });
});

// update a student from db
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentFromDb(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  });
});

// delete a student from db
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentServices.deleteStudentFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
