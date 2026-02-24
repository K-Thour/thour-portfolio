import { IqueryBuilderParams } from '../interface/common/queryBuilder.interface';

const queryBuilder = <T>(queryParams: IqueryBuilderParams<T>) => {
  const { model, params } = queryParams;
  const { populate, select, filter = {}, sort = {} } = params || {};

  let query = model.find(filter);

  if (select && select.length > 0) query = query.select(select);
  if (populate) query = query.populate(populate);
  if (sort) query = query.sort(sort);

  return query;
};

export default queryBuilder;
