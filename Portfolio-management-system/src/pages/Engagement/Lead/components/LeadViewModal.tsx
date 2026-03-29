import { useState } from "react";
import { motion } from "motion/react";
import { Modal } from "../../../../components/ui/model/Model";
import type { LeadViewModalProps, LeadStatus } from "../types";
import { navBtn, cardBase, getStatusColor } from "../utils/leadsUtils";
import { LeadInfoSection } from "./leadViewModal/LeadInfoSection";
import { ChangeStatusModal } from "./ChangeStatusModal";

export function LeadViewModal({
  lead,
  isOpen,
  onClose,
  isDark,
  onStatusChange,
}: LeadViewModalProps) {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  if (!lead) return null;

  const getStatusColorWrapper = (status: string) =>
    getStatusColor(status, isDark);

  const handleStatusConfirm = (
    leadId: number,
    newStatus: LeadStatus,
    reason?: string,
  ) => {
    onStatusChange(leadId, newStatus, reason);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Lead Details" size="md">
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cardBase(isDark)}
          >
            <LeadInfoSection
              lead={lead}
              isDark={isDark}
              getStatusColor={getStatusColorWrapper}
            />
          </motion.div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-inherit">
          <button
            onClick={() => setIsStatusModalOpen(true)}
            className={navBtn(isDark, "primary")}
          >
            Change Status
          </button>
          <button
            type="button"
            onClick={onClose}
            className={navBtn(isDark, "secondary")}
          >
            Close
          </button>
        </div>
      </Modal>

      <ChangeStatusModal
        lead={lead}
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        isDark={isDark}
        onConfirm={handleStatusConfirm}
      />
    </>
  );
}
