export type VolunteerRequestStatus = 'Wait' | 'Reject' | 'Approve' | 'Canceled';

export const VolunteerRequestStatus2Title: Record<VolunteerRequestStatus, string> = {
  Wait: '승인대기중',
  Approve: '승인됨',
  Canceled: '취소됨',
  Reject: '반려됨',
};

export const VolunteerRequestStatus2Style: Record<VolunteerRequestStatus, string> = {
  Wait: 'bg-amber-100 text-amber-900',
  Approve: 'bg-primary text-white',
  Canceled: 'bg-gray-200 text-gray-800',
  Reject: 'bg-gray-800 text-gray-100',
};
