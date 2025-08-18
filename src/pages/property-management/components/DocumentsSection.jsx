import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DocumentsSection = ({ documents = [], propertyId }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'docx': case'doc':
        return 'FileText';
      case 'xlsx': case'xls':
        return 'FileSpreadsheet';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'Image';
      case 'zip': case'rar':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-red-500';
      case 'docx': case'doc':
        return 'text-blue-500';
      case 'xlsx': case'xls':
        return 'text-green-500';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'text-purple-500';
      case 'zip': case'rar':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleFileUpload = (e) => {
    e?.preventDefault();
    if (uploadFile) {
      console.log('Uploading file:', uploadFile?.name);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowUpload(false);
            setUploadFile(null);
            setUploadProgress(0);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Documents</h3>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="text-sm text-primary hover:text-primary-600 flex items-center space-x-1"
          >
            <Icon name="Upload" size={16} />
            <span>Upload</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        {/* Upload Form */}
        {showUpload && (
          <div className="mb-4 p-4 border border-border rounded-lg bg-surface-hover">
            <form onSubmit={handleFileUpload}>
              <div className="space-y-3">
                <div>
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e?.target?.files?.[0])}
                    className="block w-full text-sm text-text-secondary
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-medium
                      file:bg-primary file:text-white
                      hover:file:bg-primary-600
                      file:cursor-pointer cursor-pointer"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                  />
                </div>
                
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button
                  type="submit"
                  disabled={!uploadFile || uploadProgress > 0}
                  className="btn-primary text-sm px-3 py-1 disabled:opacity-50"
                >
                  {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload File'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpload(false);
                    setUploadFile(null);
                    setUploadProgress(0);
                  }}
                  className="text-sm px-3 py-1 text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Documents List */}
        <div className="space-y-3">
          {documents?.length > 0 ? (
            documents?.map((doc) => (
              <div key={doc?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-surface-hover transition-colors duration-150">
                <div className={`w-8 h-8 flex items-center justify-center ${getFileColor(doc?.type)}`}>
                  <Icon name={getFileIcon(doc?.type)} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {doc?.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <span>{doc?.size}</span>
                    <span>•</span>
                    <span>Uploaded {formatDate(doc?.uploadedAt)}</span>
                    <span>•</span>
                    <span>by {doc?.uploadedBy}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-text-secondary hover:text-text-primary">
                    <Icon name="Download" size={16} />
                  </button>
                  <button className="text-text-secondary hover:text-error">
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="FileText" size={32} className="text-text-tertiary mx-auto mb-2" />
              <p className="text-text-secondary text-sm">No documents uploaded yet</p>
              <p className="text-text-tertiary text-xs">Property documents, photos, and contracts will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;