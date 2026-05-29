// src/pages/auth/Verify.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Loader from '../../components/Loader';
import { 
  UploadIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ShieldCheckIcon,
  CameraIcon,
  DocumentIcon 
} from '../../components/Icons';


const API_BASE_URL = "https://relance-backend-oucs.onrender.com/api"; 

const Verify = () => {
  const navigate = useNavigate();
const [showCamera, setShowCamera] = useState(false);
const [stream, setStream] = useState(null);
const videoRef = React.useRef(null);
const canvasRef = React.useRef(null);

  const [verificationStep, setVerificationStep] = useState(1);
const [loading, setLoading] = useState({
  id: false,
  address: false,
  selfie: false,
});
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [uploadedFiles, setUploadedFiles] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
  });

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Account created' },
    { id: 2, title: 'ID Verification', description: 'Upload documents' },
    { id: 3, title: 'Selfie Verification', description: 'Take a photo' },
    { id: 4, title: 'Review', description: 'Final approval' },
  ];

  const verificationRequirements = [
    { id: 1, title: 'Government ID', description: 'Passport, Driver\'s License, or National ID', type: 'id' },
    { id: 2, title: 'Proof of Address', description: 'Utility bill or bank statement (last 3 months)', type: 'address' },
    { id: 3, title: 'Selfie with ID', description: 'Your face with your ID card visible', type: 'selfie' },
  ];

const handleFileUpload = async (type, e) => {
  const file = e.target.files[0];
  if (!file) return;

  setLoading(prev => ({ ...prev, [type]: true }));

  try {
    const formData = new FormData();

    // ✅ CRITICAL FIX
    formData.append("documents", file);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/verification/submit-documents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    setUploadedFiles(prev => ({
      ...prev,
      [type]: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }
    }));
  } catch (err) {
    console.error(err);
    alert("Upload failed. Try again.");
  } finally {
    setLoading(prev => ({ ...prev, [type]: false }));
  }
};


const startCamera = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    setStream(mediaStream);
    setShowCamera(true);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    }, 100);
  } catch (err) {
    console.error(err);
    alert("Camera access denied or not available.");
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  setStream(null);
  setShowCamera(false);
};

const capturePhoto = async () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append("selfie", blob, "selfie.jpg");

    setLoading(prev => ({ ...prev, selfie: true }));

    try {
const token = localStorage.getItem("token");

const res = await fetch(`${API_BASE_URL}/verification/submit-selfie`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

      if (!res.ok) throw new Error("Selfie upload failed");

      setUploadedFiles(prev => ({
        ...prev,
        selfie: {
          name: "Selfie.jpg",
          size: blob.size,
          type: blob.type,
          url: URL.createObjectURL(blob),
        }
      }));

      stopCamera();
    } catch (err) {
      console.error(err);
      alert("Selfie upload failed.");
    } finally {
      setLoading(prev => ({ ...prev, selfie: false }));
    }
  }, "image/jpeg");
};

const handleSubmitVerification = async () => {
  setLoading(prev => ({ ...prev, selfie: true }));

  try {
    // Simulate verification API call
    setVerificationStatus('approved');
    setVerificationStep(4);

    // ✅ Get role from localStorage
    const role = localStorage.getItem('userRole'); // 'buyer' or 'seller'

    // Redirect after a short delay so user sees the success message
    setTimeout(() => {
      if (role === 'buyer') {
        navigate('/buyer-dashboard'); // route for buyers
      } else if (role === 'seller') {
        navigate('/seller-dashboard'); // route for sellers
      } else {
        navigate('/dashboard'); // fallback
      }
    }, 1500); // 1.5s delay for UX
  } catch (err) {
    console.error(err);
    alert("Verification failed");
  } finally {
    setLoading(prev => ({ ...prev, selfie: false }));
  }
};
  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'approved':
        return <CheckCircleIcon className="h-12 w-12 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-12 w-12 text-red-500" />;
      default:
        return <ClockIcon className="h-12 w-12 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'approved':
        return <Badge variant="success" className="text-lg py-2 px-6">Verified</Badge>;
      case 'rejected':
        return <Badge variant="error" className="text-lg py-2 px-6">Rejected</Badge>;
      default:
        return <Badge variant="warning" className="text-lg py-2 px-6">Pending Review</Badge>;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'approved':
        return 'Your account has been successfully verified. You can now access all platform features.';
      case 'rejected':
        return 'We couldn\'t verify your documents. Please upload clear photos and try again.';
      default:
        return 'Your documents are under review. This usually takes 1-2 business days.';
    }
  };

  return (
    <AuthLayout
      title="Verify Your Account"
      subtitle="Complete verification to access all features"
    >
      {/* Progress Steps */}
      <div className="mb-8 animate-fadeInUp">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-green-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${((verificationStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-500 ease-in-out
                  ${verificationStep >= step.id 
                    ? 'bg-green-500 text-white scale-110 shadow-lg' 
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }
                  ${verificationStep === step.id ? 'ring-4 ring-green-200' : ''}
                `}>
                  {verificationStep > step.id ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs font-semibold text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        {verificationStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <ShieldCheckIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome! Let's get you verified</h3>
              <p className="text-gray-600">
                Verification helps us create a safe community for everyone. 
                You'll need to upload a few documents to get started.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-3">Why we verify accounts:</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Ensures secure transactions for buyers and sellers
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Builds trust within our community
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Protects against fraud and unauthorized access
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Required for payments and withdrawals
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              className="w-full group hover:scale-105 transition-all duration-300"
              onClick={() => setVerificationStep(2)}
            >
              Start Verification
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Button>
          </div>
        )}

        {verificationStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <DocumentIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Documents</h3>
              <p className="text-gray-600">
                Please upload clear photos of your identification documents
              </p>
            </div>

            <div className="space-y-4">
              {verificationRequirements.map((req, index) => (
                <div 
                  key={req.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{req.title}</h4>
                      <p className="text-sm text-gray-600">{req.description}</p>
                    </div>
                    {uploadedFiles[req.type] ? (
                      <Badge variant="success" className="animate-pulse">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="warning">Required</Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className={`
                      flex-1 cursor-pointer
                      ${uploadedFiles[req.type] 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-green-400'
                      }
                      border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300
                      hover:scale-105
                    `}>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(req.type, e)}
                      disabled={loading[req.type] || uploadedFiles[req.type]}
                      />
                      {loading[req.type] && !uploadedFiles[req.type] ? (
                        <div className="space-y-2">
                          <Loader />
                          <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                      ) : uploadedFiles[req.type] ? (
                        <div className="space-y-2">
                          <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto" />
                          <p className="text-sm font-medium text-green-700">{uploadedFiles[req.type].name}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFiles[req.type].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <UploadIcon className="h-8 w-8 text-gray-400 mx-auto" />
                          <p className="text-sm font-medium text-gray-700">Click to upload</p>
                          <p className="text-xs text-gray-500">JPG, PNG, PDF up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setVerificationStep(1)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                className="flex-1 group hover:scale-105 transition-all duration-300"
                onClick={() => setVerificationStep(3)}
                disabled={Object.values(uploadedFiles).filter(v => v !== null).length < 2}
              >
                Continue
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Button>
            </div>
          </div>
        )}

        {verificationStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <CameraIcon className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Take a Selfie</h3>
              <p className="text-gray-600">
                Please take a clear photo of yourself holding your ID
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="text-center mb-6">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full animate-pulse"></div>
                  <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                    <CameraIcon className="h-16 w-16 text-purple-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Make sure your face and ID are clearly visible
                </p>
              </div>

              <div className="space-y-4">
              <label
  onClick={startCamera}
  className={`
    block cursor-pointer
    ${uploadedFiles.selfie 
      ? 'border-green-500 bg-green-50' 
      : 'border-gray-300 hover:border-green-400'
    }
    border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300
    hover:scale-105
  `}
>
                 
{loading.selfie && !uploadedFiles.selfie ? (
                    <div className="space-y-2">
                      <Loader />
                      <p className="text-sm text-gray-600">Uploading selfie...</p>
                    </div>
                  ) : uploadedFiles.selfie ? (
                    <div className="space-y-2">
                      <CheckCircleIcon className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="text-sm font-medium text-green-700">Selfie uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CameraIcon className="h-8 w-8 text-purple-400 mx-auto" />
                      <p className="text-sm font-medium text-gray-700">
                        Click to take a selfie
                      </p>
                      <p className="text-xs text-gray-500">Use your camera or upload a photo</p>
                    </div>
                  )}
                </label>
              </div>
{showCamera && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-4 w-[90%] max-w-md">
      <video
        ref={videoRef}
        autoPlay
        className="w-full rounded-lg"
      />

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex space-x-3 mt-4">
        <Button variant="outline" className="flex-1" onClick={stopCamera}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" onClick={capturePhoto}>
          Capture
        </Button>
      </div>
    </div>
  </div>
)}
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Your selfie will be compared with your ID photo for verification.
                      Make sure both are clear and well-lit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setVerificationStep(2)}
              >
                Back
              </Button>
              <Button
  variant="primary"
  className="flex-1 group hover:scale-105 transition-all duration-300"
  onClick={handleSubmitVerification}
  loading={loading.selfie}
  disabled={!uploadedFiles.selfie || loading.selfie}
>
  Submit for Review
</Button>
            </div>
          </div>
        )}

        {verificationStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              {getStatusIcon()}
              <div className="mt-4 mb-6">
                {getStatusBadge()}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {verificationStatus === 'approved' ? 'Verification Complete!' : 'Verification Submitted'}
              </h3>
              <p className="text-gray-600 text-lg">{getStatusMessage()}</p>
            </div>

            {verificationStatus === 'approved' ? (
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-green-900">You're all set!</h4>
                      <p className="text-sm text-green-800">
                        Your account is now fully verified. Welcome to the community!
                      </p>
                    </div>
                  </div>
                </div>

<Button
  variant="primary"
  className="w-full"
  onClick={() => {
    const role = localStorage.getItem('userRole');
    if (role === 'buyer') navigate('/buyer-dashboard');
    else if (role === 'seller') navigate('/seller-dashboard');
    else navigate('/dashboard');
  }}
>
  Go to Dashboard
</Button>
              </div>
            ) : verificationStatus === 'pending' ? (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center">
                    <ClockIcon className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-blue-900">What happens next?</h4>
                      <ul className="mt-2 space-y-1 text-sm text-blue-800">
                        <li>• Our team will review your documents within 24-48 hours</li>
                        <li>• You'll receive an email notification once verified</li>
                        <li>• You can still browse the platform while waiting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="group hover:scale-105 transition-all duration-300"
                    onClick={() => navigate('/explore')}
                  >
                    Browse Services
                  </Button>
                  <Button
                    variant="primary"
                    className="group hover:scale-105 transition-all duration-300"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <div className="flex items-center">
                    <XCircleIcon className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-red-900">Verification Failed</h4>
                      <p className="mt-2 text-sm text-red-800">
                        Common reasons for rejection:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-red-800">
                        <li>• Blurry or unclear photos</li>
                        <li>• Documents don't match provided information</li>
                        <li>• Expired or invalid documents</li>
                        <li>• Photos don't meet requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full group hover:scale-105 transition-all duration-300"
                  onClick={() => setVerificationStep(1)}
                >
                  Try Again
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '400ms' }}>
        <p className="text-sm text-gray-500">
          Need help with verification?{' '}
          <button className="text-green-600 hover:text-green-700 font-medium transition-colors duration-300">
            Contact Support
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Verify;
