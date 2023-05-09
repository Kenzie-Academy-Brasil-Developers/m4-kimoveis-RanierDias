import { IScheduleRegister, TController } from "../interfaces";
import { scheduleDataRegisterSchema } from "../schemas/schedule";
import requestCreateSchedule from "../services/schedule/create";
import requestGetProprietyListSchedule from "../services/schedule/read";

export const createSchedule: TController = async (req, res) => {
  const payload = scheduleDataRegisterSchema.parse(req.body);
  const userId = Number(res.locals.userId);
  const schedule = await requestCreateSchedule(payload, userId);

  return res.status(201).json(schedule);
};

export const getProprietyListSchedule: TController = async (req, res) => {
  const payload = Number(req.params.id);
  const scheduleList = await requestGetProprietyListSchedule(payload);

  return res.status(200).json(scheduleList);
};
