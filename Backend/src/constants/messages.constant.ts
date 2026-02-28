const MESSAGES_COMMON = {
  success: {
    fetchedSuccessfully: 'Fetched successfully',
    createdSuccessfully: 'Created successfully',
    updatedSuccessfully: 'Updated successfully',
    deletedSuccessfully: 'Deleted successfully',
  },
  error: {
    notFound: 'Not found',
    failedToFetch: 'Failed to fetch',
    failedToCreate: 'Failed to create',
    failedToUpdate: 'Failed to update',
    failedToDelete: 'Failed to delete',
    internalServerError: 'Internal server error',
  },
} as const;

export default MESSAGES_COMMON;
