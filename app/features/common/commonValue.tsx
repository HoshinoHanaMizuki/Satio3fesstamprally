export const thisYear = new Date().getFullYear()-1;
export const today = new Date();
export const startDate = new Date('2025-10-08');
export const endDate = new Date('2026-01-01');
export const isHold :boolean = today >= startDate && today <= endDate;