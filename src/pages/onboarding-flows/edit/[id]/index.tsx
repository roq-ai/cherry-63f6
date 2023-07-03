import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getOnboardingFlowById, updateOnboardingFlowById } from 'apiSdk/onboarding-flows';
import { Error } from 'components/error';
import { onboardingFlowValidationSchema } from 'validationSchema/onboarding-flows';
import { OnboardingFlowInterface } from 'interfaces/onboarding-flow';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TemplateInterface } from 'interfaces/template';
import { PlatformInterface } from 'interfaces/platform';
import { getTemplates } from 'apiSdk/templates';
import { getPlatforms } from 'apiSdk/platforms';

function OnboardingFlowEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OnboardingFlowInterface>(
    () => (id ? `/onboarding-flows/${id}` : null),
    () => getOnboardingFlowById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OnboardingFlowInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOnboardingFlowById(id, values);
      mutate(updated);
      resetForm();
      router.push('/onboarding-flows');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OnboardingFlowInterface>({
    initialValues: data,
    validationSchema: onboardingFlowValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Onboarding Flow
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<TemplateInterface>
              formik={formik}
              name={'template_id'}
              label={'Select Template'}
              placeholder={'Select Template'}
              fetcher={getTemplates}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<PlatformInterface>
              formik={formik}
              name={'platform_id'}
              label={'Select Platform'}
              placeholder={'Select Platform'}
              fetcher={getPlatforms}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'onboarding_flow',
    operation: AccessOperationEnum.UPDATE,
  }),
)(OnboardingFlowEditPage);
