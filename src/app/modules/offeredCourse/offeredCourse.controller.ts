import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OfferedCourseServices } from './offeredCourse.service';

// create offered course
const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created successfully!',
    data: result,
  });
});

// get all offered course
const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const offeredCourses =
    await OfferedCourseServices.getAllOfferedCoursesFromDB();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered courses retrieved successfully!',
    data: offeredCourses,
  });
});

// get single offerde courses
const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const offeredCourse =
      await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

    if (!offeredCourse) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Offered course not found',
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course fetched successfully',
      data: offeredCourse,
    });
  },
);

// update offeded course
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});

// delete offered course from db
const deleteOfferedCourseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse deleted successfully',
      data: result,
    });
  },
);

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
