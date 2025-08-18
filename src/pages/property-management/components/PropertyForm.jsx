import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const PropertyForm = ({ property, clients, statuses, propertyTypes, agents, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    status: 'available',
    propertyType: 'house',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    sqft: '',
    lotSize: '',
    yearBuilt: '',
    assignedAgent: '',
    clientId: '',
    description: '',
    features: {
      parking: '',
      heating: '',
      flooring: '',
      kitchen: '',
      outdoor: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property?.title || '',
        price: property?.price || '',
        status: property?.status || 'available',
        propertyType: property?.propertyType || 'house',
        address: property?.address || '',
        bedrooms: property?.bedrooms || 1,
        bathrooms: property?.bathrooms || 1,
        sqft: property?.sqft || '',
        lotSize: property?.lotSize || '',
        yearBuilt: property?.yearBuilt || '',
        assignedAgent: property?.assignedAgent || '',
        clientId: property?.clientId || '',
        description: property?.description || '',
        features: {
          parking: property?.features?.parking || '',
          heating: property?.features?.heating || '',
          flooring: property?.features?.flooring || '',
          kitchen: property?.features?.kitchen || '',
          outdoor: property?.features?.outdoor || ''
        }
      });
    }
  }, [property]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFeatureChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev?.features,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Property title is required';
    }
    
    if (!formData?.price || formData?.price <= 0) {
      newErrors.price = 'Property price must be greater than 0';
    }
    
    if (!formData?.address?.trim()) {
      newErrors.address = 'Property address is required';
    }
    
    if (!formData?.assignedAgent) {
      newErrors.assignedAgent = 'Assigned agent is required';
    }
    
    if (!formData?.sqft || formData?.sqft <= 0) {
      newErrors.sqft = 'Square footage must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setHasChanges(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const getStatusColor = (status) => {
    const statusObj = statuses?.find(s => s?.value === status);
    return statusObj ? statusObj?.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Property Information</h2>
        {hasChanges && (
          <span className="text-sm text-warning flex items-center space-x-1">
            <Icon name="AlertCircle" size={16} />
            <span>Unsaved changes</span>
          </span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Property Title *
            </label>
            <input
              type="text"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              className={`input-field ${errors?.title ? 'border-error' : ''}`}
              placeholder="e.g., Modern Family Home - Oak Street"
            />
            {errors?.title && (
              <p className="mt-1 text-sm text-error">{errors?.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
              <input
                type="number"
                value={formData?.price}
                onChange={(e) => handleInputChange('price', parseFloat(e?.target?.value) || '')}
                className={`input-field pl-8 ${errors?.price ? 'border-error' : ''}`}
                placeholder="450000"
                min="0"
                step="1000"
              />
            </div>
            {errors?.price && (
              <p className="mt-1 text-sm text-error">{errors?.price}</p>
            )}
            {formData?.price && (
              <p className="mt-1 text-sm text-text-secondary">
                {formatCurrency(formData?.price)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Property Type *
            </label>
            <select
              value={formData?.propertyType}
              onChange={(e) => handleInputChange('propertyType', e?.target?.value)}
              className="input-field"
            >
              {propertyTypes?.map(type => (
                <option key={type?.value} value={type?.value}>
                  {type?.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Address *
            </label>
            <input
              type="text"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              className={`input-field ${errors?.address ? 'border-error' : ''}`}
              placeholder="123 Oak Street, Downtown Area"
            />
            {errors?.address && (
              <p className="mt-1 text-sm text-error">{errors?.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Status *
            </label>
            <select
              value={formData?.status}
              onChange={(e) => handleInputChange('status', e?.target?.value)}
              className="input-field"
            >
              {statuses?.map(status => (
                <option key={status?.value} value={status?.value}>
                  {status?.label}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(formData?.status)}`}>
                {statuses?.find(s => s?.value === formData?.status)?.label}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Assigned Agent *
            </label>
            <select
              value={formData?.assignedAgent}
              onChange={(e) => handleInputChange('assignedAgent', e?.target?.value)}
              className={`input-field ${errors?.assignedAgent ? 'border-error' : ''}`}
            >
              <option value="">Select agent</option>
              {agents?.map(agent => (
                <option key={agent?.value} value={agent?.label}>
                  {agent?.label}
                </option>
              ))}
            </select>
            {errors?.assignedAgent && (
              <p className="mt-1 text-sm text-error">{errors?.assignedAgent}</p>
            )}
          </div>
        </div>

        {/* Property Details Section */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Property Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                value={formData?.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', parseInt(e?.target?.value) || 0)}
                className="input-field"
                min="0"
                max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                step="0.5"
                value={formData?.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', parseFloat(e?.target?.value) || 0)}
                className="input-field"
                min="0"
                max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Square Feet *
              </label>
              <input
                type="number"
                value={formData?.sqft}
                onChange={(e) => handleInputChange('sqft', parseInt(e?.target?.value) || '')}
                className={`input-field ${errors?.sqft ? 'border-error' : ''}`}
                placeholder="2500"
                min="0"
              />
              {errors?.sqft && (
                <p className="mt-1 text-sm text-error">{errors?.sqft}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Lot Size (acres)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData?.lotSize}
                onChange={(e) => handleInputChange('lotSize', parseFloat(e?.target?.value) || '')}
                className="input-field"
                placeholder="0.25"
                min="0"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Year Built
              </label>
              <input
                type="number"
                value={formData?.yearBuilt}
                onChange={(e) => handleInputChange('yearBuilt', parseInt(e?.target?.value) || '')}
                className="input-field"
                placeholder="2018"
                min="1800"
                max={new Date()?.getFullYear() + 5}
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Primary Client
              </label>
              <select
                value={formData?.clientId}
                onChange={(e) => handleInputChange('clientId', parseInt(e?.target?.value))}
                className="input-field"
              >
                <option value="">Select client</option>
                {clients?.map(client => (
                  <option key={client?.id} value={client?.id}>
                    {client?.name} ({client?.type})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Property Description
          </label>
          <textarea
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            rows={4}
            className="input-field resize-none"
            placeholder="Describe the property features, location benefits, and unique selling points..."
          />
        </div>

        {/* Features Section */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Property Features</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Parking
              </label>
              <input
                type="text"
                value={formData?.features?.parking}
                onChange={(e) => handleFeatureChange('parking', e?.target?.value)}
                className="input-field"
                placeholder="e.g., 2-car garage, Street parking"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Heating & Cooling
              </label>
              <input
                type="text"
                value={formData?.features?.heating}
                onChange={(e) => handleFeatureChange('heating', e?.target?.value)}
                className="input-field"
                placeholder="e.g., Central heating & cooling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Flooring
              </label>
              <input
                type="text"
                value={formData?.features?.flooring}
                onChange={(e) => handleFeatureChange('flooring', e?.target?.value)}
                className="input-field"
                placeholder="e.g., Hardwood, Tile, Carpet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Kitchen Features
              </label>
              <input
                type="text"
                value={formData?.features?.kitchen}
                onChange={(e) => handleFeatureChange('kitchen', e?.target?.value)}
                className="input-field"
                placeholder="e.g., Gourmet kitchen with granite counters"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Outdoor Features
              </label>
              <input
                type="text"
                value={formData?.features?.outdoor}
                onChange={(e) => handleFeatureChange('outdoor', e?.target?.value)}
                className="input-field"
                placeholder="e.g., Spacious backyard, covered patio, pool"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => window.location?.reload()}
            className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-150"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Icon name="Save" size={16} />
                <span>Save Property</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;