import { useState } from "react";
import { toast } from "react-toastify";

import {
  idTypeService,
  civilStatusService,
  genderService,
  nationalitiesService,
} from "../services/systemApiService";

import { mapToSelectOptions } from "../utils/utils";

// hook to get some common profile data
const useProfileData = () => {
  const [genders, setGenders] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [nationalities, setNationalities] = useState([]);

  const loadProfileData = async () => {
    try {
      const [idTypesResp, civilStatusResp, gendersResp, nationalitiesResp] =
        await Promise.all([
          idTypeService.getAll(),
          civilStatusService.getAll(),
          genderService.getAll(),
          nationalitiesService.getAll(),
        ]);

      setIdTypes(mapToSelectOptions(idTypesResp));
      setCivilStatus(mapToSelectOptions(civilStatusResp));
      setGenders(mapToSelectOptions(gendersResp));
      setNationalities(mapToSelectOptions(nationalitiesResp));
    } catch (err) {
      toast.error(err.message || "Failed to load profile related data");
    }
  };

  return {
    genders,
    idTypes,
    civilStatus,
    nationalities,
    loadProfileData,
  };
};

export default useProfileData;
