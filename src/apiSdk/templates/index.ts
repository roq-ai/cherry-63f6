import axios from 'axios';
import queryString from 'query-string';
import { TemplateInterface, TemplateGetQueryInterface } from 'interfaces/template';
import { GetQueryInterface } from '../../interfaces';

export const getTemplates = async (query?: TemplateGetQueryInterface) => {
  const response = await axios.get(`/api/templates${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTemplate = async (template: TemplateInterface) => {
  const response = await axios.post('/api/templates', template);
  return response.data;
};

export const updateTemplateById = async (id: string, template: TemplateInterface) => {
  const response = await axios.put(`/api/templates/${id}`, template);
  return response.data;
};

export const getTemplateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/templates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTemplateById = async (id: string) => {
  const response = await axios.delete(`/api/templates/${id}`);
  return response.data;
};
