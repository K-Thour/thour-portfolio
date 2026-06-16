import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLeads } from './useLeads';
import { fetchLeads, updateLead } from '../../../../services/api';

vi.mock('../../../../services/api', () => ({
  fetchLeads: vi.fn(),
  updateLead: vi.fn(),
}));

describe('useLeads hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and map leads on mount', async () => {
    const mockLeads = [
      {
        _id: 'l1',
        name: 'Karanveer',
        email: 'karan@example.com',
        mobileNumber: '1234567890',
        createdAt: '2026-06-16T12:00:00Z',
        status: 'New',
        description: 'Need assistance',
      },
    ];

    vi.mocked(fetchLeads).mockResolvedValueOnce(mockLeads);

    const { result } = renderHook(() => useLeads());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetchLeads).toHaveBeenCalledTimes(1);
    expect(result.current.allLeads).toHaveLength(1);
    expect(result.current.allLeads[0]).toEqual({
      id: 'l1',
      name: 'Karanveer',
      email: 'karan@example.com',
      phone: '1234567890',
      date: '2026-06-16',
      status: 'New',
      description: 'Need assistance',
    });
  });

  it('should update lead status successfully', async () => {
    const mockLeads = [
      {
        _id: 'l1',
        name: 'Karanveer',
        email: 'karan@example.com',
        status: 'New',
      },
    ];
    vi.mocked(fetchLeads).mockResolvedValue(mockLeads);
    vi.mocked(updateLead).mockResolvedValue({} as any);

    const { result } = renderHook(() => useLeads());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.handleStatusChange('l1', 'Contacted');
    });

    expect(updateLead).toHaveBeenCalledWith('l1', { status: 'Contacted' });
    expect(fetchLeads).toHaveBeenCalledTimes(2); // reloads leads after status change
  });
});
