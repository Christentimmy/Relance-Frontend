// src/pages/auth/Verification.jsx
import React, { useState } from 'react';
import UploadCard from '../../components/settings/UploadCard';
import StatusBadge from '../../components/settings/StatusBadge';
import { FiCamera, FiCreditCard, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const API_BASE_URL = "https://relance-backend-oucs.onrender.com/api";

const Verification = () => {
  const [identityFiles, setIdentityFiles] = useState([]); // array for multiple ID docs
  const [selfieFile, setSelfieFile] = useState(null);

  const [loading, setLoading] = useState({
    identity: false,
    selfie: false
  });

  const [verificationStatus, setVerificationStatus] = useState({
    identity: 'pending', // 'pending', 'uploaded', 'verified', 'rejected'
    selfie: 'pending',
    overall: 'pending'
  });

  const handleIdentityUpload = async (file) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in.');

    const formData = new FormData();
    formData.append('documents', file); // backend expects `documents`

    try {
      setLoading(prev => ({ ...prev, identity: true }));
      const res = await fetch(`${API_BASE_URL}/verification/submit-documents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        // handle specific error messages from backend
        if (data?.message) alert(data.message);
        else alert('Upload failed.');
        setVerificationStatus(prev => ({ ...prev, identity: 'pending' }));
        return;
      }

      setIdentityFiles(prev => [...prev, file]);
      setVerificationStatus(prev => ({ ...prev, identity: 'uploaded' }));
      console.log('Identity uploaded successfully:', data);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
      setVerificationStatus(prev => ({ ...prev, identity: 'pending' }));
    } finally {
      setLoading(prev => ({ ...prev, identity: false }));
    }
  };

  const handleSelfieUpload = async (file) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in.');

    const formData = new FormData();
    formData.append('selfie', file);

    try {
      setLoading(prev => ({ ...prev, selfie: true }));
      const res = await fetch(`${API_BASE_URL}/verification/submit-selfie`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.message) alert(data.message);
        else alert('Selfie upload failed.');
        setVerificationStatus(prev => ({ ...prev, selfie: 'pending' }));
        return;
      }

      setSelfieFile(file);
      setVerificationStatus(prev => ({ ...prev, selfie: 'uploaded' }));
      console.log('Selfie uploaded successfully:', data);
    } catch (err) {
      console.error(err);
      alert('Selfie upload failed. Please try again.');
      setVerificationStatus(prev => ({ ...prev, selfie: 'pending' }));
    } finally {
      setLoading(prev => ({ ...prev, selfie: false }));
    }
  };

  const handleSubmitVerification = () => {
    if (!identityFiles.length || !selfieFile) {
      return alert('Please upload all required files before submitting.');
    }

    alert('Verification submitted. Waiting for admin approval.');
    setVerificationStatus(prev => ({ ...prev, overall: 'pending' }));
  };

  const handleRemoveIdentity = (index) => {
    const updated = [...identityFiles];
    updated.splice(index, 1);
    setIdentityFiles(updated);
    if (!updated.length) setVerificationStatus(prev => ({ ...prev, identity: 'pending' }));
  };

  const handleRemoveSelfie = () => {
    setSelfieFile(null);
    setVerificationStatus(prev => ({ ...prev, selfie: 'pending' }));
  };

  return (
    <div className="p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6">Verification</h3>

      {/* Identity Upload */}
      <UploadCard
        title="Upload Identity Document"
        description="Passport, Driver's License, or National ID"
        acceptedFormats="*.jpg, *.jpeg, *.png, *.pdf"
        onFileSelect={handleIdentityUpload}
        uploadedFile={identityFiles[0] || null} // just show first uploaded
        onRemove={() => handleRemoveIdentity(0)}
        status={verificationStatus.identity}
        loading={loading.identity}
      />

      {/* Selfie Upload */}
      <UploadCard
        title="Upload Selfie"
        description="Clear selfie with face visible, preferably holding your ID"
        acceptedFormats="*.jpg, *.jpeg, *.png"
        onFileSelect={handleSelfieUpload}
        uploadedFile={selfieFile}
        onRemove={handleRemoveSelfie}
        status={verificationStatus.selfie}
        loading={loading.selfie}
      />

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmitVerification}
          disabled={!identityFiles.length || !selfieFile}
          className={`px-8 py-3 rounded-xl font-medium transition-all duration-300
            ${identityFiles.length && selfieFile
              ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Submit for Verification
        </button>
      </div>
    </div>
  );
};

export default Verification;
