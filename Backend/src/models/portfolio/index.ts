import { IPortfolioModel } from '../../interface/models/portfolio/portfolio.interface';
import { ICommonModelIndex } from '../common/common.index';
import portfolioModel from './portfolio.model';
import portfolioRepository from './portfolio.repository';
import portfolioSchema from './portfolio.schema';

export default <ICommonModelIndex<IPortfolioModel>>{
  repo: portfolioRepository,
  model: portfolioModel,
  schema: portfolioSchema,
};
