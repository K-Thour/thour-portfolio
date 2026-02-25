import { model } from 'mongoose';
import { IPortfolioModel } from '../../interface/models/portfolio/portfolio.interface';
import portfolioSchema from './portfolio.schema';

const portfolioModel = model<IPortfolioModel>('Portfolio', portfolioSchema);

export default portfolioModel;
