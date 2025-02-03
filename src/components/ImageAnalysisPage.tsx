import React, { useState } from 'react';
    import { ArrowLeft, AlertTriangle } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';
    import ToolAnalysisPage from './ToolAnalysisPage';

    const ImageAnalysisPage: React.FC = () => {
      const navigate = useNavigate();
      const [analysisResult, setAnalysisResult] = useState<{ isAiGenerated: boolean, percentage: number } | null>(null);
      const [loading, setLoading] = useState(false);
      const [imageSrc, setImageSrc] = useState<string | null>(null);
      const [file, setFile] = useState<File | null>(null);

      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageSrc(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

      const analyzeImage = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const randomPercentage = Math.floor(Math.random() * 101);
        const isAiGenerated = randomPercentage > 50;
        setAnalysisResult({ isAiGenerated, percentage: randomPercentage });
        setLoading(false);
      };

      const getRiskColor = (percentage: number | undefined) => {
        if (percentage === undefined) return 'text-gray-400';
        if (percentage < 33) return 'text-green-400';
        if (percentage < 66) return 'text-orange-400';
        return 'text-red-400';
      };

      const getProgressBarColor = (percentage: number | undefined) => {
        if (percentage === undefined) return 'bg-gray-500';
        if (percentage < 33) return 'bg-green-500';
        if (percentage < 66) return 'bg-orange-500';
        return 'bg-red-500';
      };

      const getActionColor = (percentage: number | undefined) => {
        if (percentage === undefined) return 'bg-gray-700';
        if (percentage < 33) return 'bg-green-700';
        if (percentage < 66) return 'bg-orange-700';
        return 'bg-red-700';
      };

      const riskColor = getRiskColor(analysisResult?.percentage);
      const progressBarColor = getProgressBarColor(analysisResult?.percentage);
      const actionColor = getActionColor(analysisResult?.percentage);

      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 text-white p-8">
          <div className="max-w-3xl mx-auto bg-[#1e213a] rounded-lg p-8 shadow-lg">
            <button onClick={() => navigate(-1)} className="flex items-center mb-6 text-gray-300 hover:text-white">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold mb-6">Risk Assessment</h1>
            <div className="mb-6">
              <p className="text-gray-300 mb-2">Upload or Paste Image:</p>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-md p-4 mb-4">
                {imageSrc ? (
                  <img src={imageSrc} alt="Uploaded or Pasted" className="max-h-64 max-w-full mb-4 rounded-md" />
                ) : (
                  <p className="text-gray-400">No image selected</p>
                )}
                <label htmlFor="image-upload" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <button
                onClick={analyzeImage}
                disabled={loading || !file}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
            {loading ? (
              <div className="text-center">Analyzing...</div>
            ) : analysisResult ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-2xl font-bold ${riskColor}`}>
                    {analysisResult.percentage}% Risk Level
                  </h2>
                  <div className={`w-4 h-4 ${progressBarColor} rounded-full`}></div>
                </div>
                <div className="bg-gray-800 rounded-full h-4 overflow-hidden mb-6">
                  <div
                    className={`${progressBarColor} h-full`}
                    style={{ width: analysisResult.percentage + '%' }}
                  ></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Scam Analysis</h3>
                    <div className="text-gray-300">
                      <p><span className="font-semibold text-gray-400">Type:</span> AI Image Analysis</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Source Information</h3>
                    <div className="text-gray-300">
                      <p><span className="font-semibold text-gray-400">Origin:</span> Unknown Origin</p>
                    </div>
                  </div>
                </div>
                <div className={`${actionColor} p-4 rounded-lg mb-6`}>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Immediate Actions Required
                  </h3>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Do not trust this image</li>
                    <li>Verify the source</li>
                    <li>Be cautious of manipulated content</li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <button className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md`}>
                    Report & Block
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md">
                    Learn More
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      );
    };

    export default ImageAnalysisPage;
