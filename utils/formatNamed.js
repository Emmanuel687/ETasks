export const formatedAssignedToName = (assignedTo) => {
  try {
    const parsed = typeof assignedTo === 'string' ? JSON.parse(assignedTo) : assignedTo;
    return parsed && parsed.first_name && parsed.second_name
      ? `${parsed.first_name} ${parsed.second_name}`
      : 'Not assigned';
  } catch (error) {
    console.error('Error parsing assignedTo:', error);
    return 'Not assigned';
  }
};