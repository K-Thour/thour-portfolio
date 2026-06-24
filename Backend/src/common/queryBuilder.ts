import { IqueryBuilderParams } from '../interface/common/queryBuilder.interface';

const queryBuilder = <T>(queryParams: IqueryBuilderParams<T>) => {
  const { model, params } = queryParams;
  const { populate, select, filter = {}, sort = {} } = params || {};

  const parsedFilter = Array.isArray(filter)
    ? filter.reduce((acc, curr) => ({ ...acc, ...curr }), {})
    : filter;

  let query = model.find(parsedFilter);

  if (select) query = query.select(select);
  if (populate) query = query.populate(populate);
  if (sort) query = query.sort(sort);

  return query;
};

export default queryBuilder;
