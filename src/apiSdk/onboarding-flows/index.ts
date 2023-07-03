import axios from 'axios';
import queryString from 'query-string';
import { OnboardingFlowInterface, OnboardingFlowGetQueryInterface } from 'interfaces/onboarding-flow';
import { GetQueryInterface } from '../../interfaces';

export const getOnboardingFlows = async (query?: OnboardingFlowGetQueryInterface) => {
  const response = await axios.get(`/api/onboarding-flows${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOnboardingFlow = async (onboardingFlow: OnboardingFlowInterface) => {
  const response = await axios.post('/api/onboarding-flows', onboardingFlow);
  return response.data;
};

export const updateOnboardingFlowById = async (id: string, onboardingFlow: OnboardingFlowInterface) => {
  const response = await axios.put(`/api/onboarding-flows/${id}`, onboardingFlow);
  return response.data;
};

export const getOnboardingFlowById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/onboarding-flows/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOnboardingFlowById = async (id: string) => {
  const response = await axios.delete(`/api/onboarding-flows/${id}`);
  return response.data;
};
