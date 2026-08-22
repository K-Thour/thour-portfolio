import { Request, Response } from 'express';
import services from '../services';
import { ChatMessageInput } from '../validations/chat.validations';

const sendMessage = async (req: Request, res: Response) => {
  const input: ChatMessageInput = req.body;
  const result = await services.chatServices.processChatMessage(input);
  res.status(result.statusCode).json(result);
};

const chatControllers = {
  sendMessage,
};

export default chatControllers;
