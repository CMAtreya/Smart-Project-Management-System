import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaComments } from 'react-icons/fa';

const CommunicationHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-16 min-h-screen py-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Communication Hub
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            This page is reserved for future communication features.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/user/project-architecture')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Back to Architecture
            </button>
            <button
              onClick={() => navigate('/user/chat')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaComments className="text-sm" />
              Go to Chat
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaComments className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Advanced communication features are being developed for this page.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Video Conferencing</h3>
                  <p className="text-gray-400 text-sm">Advanced video calling with screen sharing</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Voice Messages</h3>
                  <p className="text-gray-400 text-sm">Record and send voice messages</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">File Sharing</h3>
                  <p className="text-gray-400 text-sm">Advanced file sharing and collaboration</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub; 