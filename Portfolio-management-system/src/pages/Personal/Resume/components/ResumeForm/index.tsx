import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";
import type { ResumeFormProps, ResumeDesignType } from "../../types";
import { motion } from "motion/react";
import { Modal } from "../../../../../components/ui/model/Model";
import { useResumeForm } from "./hooks/useResumeForm";
import { useDesignModal } from "./hooks/useDesignModal";
import { BasicInfoFields } from "./components/BasicInfoFields";
import { DesignSectionHeader } from "./components/DesignSectionHeader";
import { DesignModalContent } from "./components/DesignModalContent";
import { ModalActions } from "./components/ModalActions";
import { FormActions } from "./components/FormActions";

export function ResumeForm({
  onSubmit,
  onCancel,
  initialData,
}: ResumeFormProps) {
  const { theme } = useAppSelector((store: RootState) => store.theme);
  const isDark = theme === "dark";
  const { formData, errors, updateField, validateForm } =
    useResumeForm(initialData);

  const onDesignSelect = (type: ResumeDesignType, code?: string) => {
    updateField("designType", type);
    updateField("designFile", undefined);
    updateField("designUrl", "");
    updateField("latexCode", code || "");
  };

  const {
    isOpen,
    modalType,
    formData: dForm,
    open,
    close,
    save,
    setModalType,
    setFormData,
    handleFileChange,
  } = useDesignModal(onDesignSelect);
  const onSubmitForm = () => {
    if (validateForm()) onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <BasicInfoFields
        formData={formData}
        errors={errors}
        isDark={isDark}
        updateField={updateField}
      />
      <div>
        <DesignSectionHeader isDark={isDark} onAddClick={open} />
      </div>
      <FormActions
        isDark={isDark}
        onCancel={onCancel}
        onSubmit={onSubmitForm}
      />
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Add Design Template"
        size="md"
      >
        <DesignModalContent
          modalType={modalType}
          formData={dForm}
          isDark={isDark}
          onTypeChange={setModalType}
          onFormDataChange={setFormData}
          onFileChange={handleFileChange}
        />
        <div className="mt-6">
          <ModalActions
            isDark={isDark}
            isSaveDisabled={!dForm.name.trim()}
            onCancel={close}
            onSave={save}
          />
        </div>
      </Modal>
    </motion.div>
  );
}

export default ResumeForm;
