import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import PropertyForm from './components/PropertyForm';
import ActivityTimeline from './components/ActivityTimeline';
import DocumentsSection from './components/DocumentsSection';
import PropertyActions from './components/PropertyActions';

const PropertyManagement = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Modern Family Home - Oak Street",
      price: 450000,
      status: "available",
      propertyType: "House",
      address: "123 Oak Street, Downtown Area",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      lotSize: 0.25,
      yearBuilt: 2018,
      assignedAgent: "Sarah Johnson",
      clientId: 1,
      description: `Beautiful modern family home located in the heart of downtown. This stunning property features an open floor plan, gourmet kitchen with granite countertops, and a spacious backyard perfect for entertaining.

The home includes hardwood floors throughout, energy-efficient appliances, and a two-car garage. The master suite boasts a walk-in closet and spa-like bathroom. Great schools nearby and walking distance to parks and shopping.`,
      features: {
        parking: "2-car garage",
        heating: "Central heating & cooling",
        flooring: "Hardwood",
        kitchen: "Gourmet kitchen with granite counters",
        outdoor: "Spacious backyard, covered patio"
      },
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-28T14:30:00Z"
    },
    {
      id: 2,
      title: "Downtown Condo - City View",
      price: 280000,
      status: "interested",
      propertyType: "Condo",
      address: "456 Pine Ave, Unit 15B, City Center",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      lotSize: null,
      yearBuilt: 2020,
      assignedAgent: "Mike Davis",
      clientId: 2,
      description: `Stunning downtown condo with breathtaking city views. This modern unit features floor-to-ceiling windows, premium finishes, and access to building amenities including fitness center, rooftop terrace, and concierge service.

The condo includes in-unit laundry, stainless steel appliances, and private balcony. Building amenities include 24/7 security, pool, and guest parking. Perfect for urban professionals seeking luxury living.`,
      features: {
        parking: "Assigned parking spot",
        heating: "Central air",
        flooring: "Luxury vinyl plank",
        kitchen: "Modern kitchen with island",
        amenities: "Fitness center, pool, rooftop terrace"
      },
      createdAt: "2024-01-05T09:15:00Z",
      updatedAt: "2024-01-27T16:45:00Z"
    }
  ];

  // Mock clients data
  const mockClients = [
    {
      id: 1,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 123-4567",
      type: "buyer",
      company: "TechCorp Solutions"
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 987-6543",
      type: "seller",
      company: "GrowthCo Marketing"
    }
  ];

  // Mock activities data
  const mockActivities = [
    {
      id: 1,
      type: "showing",
      title: "Property showing scheduled",
      description: "Scheduled showing for interested buyer - Michael Chen for Saturday 2 PM",
      timestamp: "2024-01-28T14:30:00Z",
      user: "Sarah Johnson",
      propertyId: 1
    },
    {
      id: 2,
      type: "call",
      title: "Buyer inquiry call",
      description: "45-minute call discussing property features, neighborhood, and financing options",
      timestamp: "2024-01-26T10:00:00Z",
      user: "Sarah Johnson",
      propertyId: 1
    },
    {
      id: 3,
      type: "email",
      title: "Property details sent",
      description: "Sent detailed property information, photos, and comparable sales data",
      timestamp: "2024-01-24T15:00:00Z",
      user: "Sarah Johnson",
      propertyId: 1
    }
  ];

  // Mock documents data
  const mockDocuments = [
    {
      id: 1,
      name: "Property_Listing_Photos.zip",
      size: "12.4 MB",
      type: "zip",
      uploadedAt: "2024-01-28T14:30:00Z",
      uploadedBy: "Sarah Johnson",
      propertyId: 1
    },
    {
      id: 2,
      name: "Property_Inspection_Report.pdf",
      size: "2.1 MB",
      type: "pdf",
      uploadedAt: "2024-01-26T09:15:00Z",
      uploadedBy: "Home Inspector",
      propertyId: 1
    },
    {
      id: 3,
      name: "Comparable_Sales_Analysis.xlsx",
      size: "856 KB",
      type: "xlsx",
      uploadedAt: "2024-01-24T16:20:00Z",
      uploadedBy: "Sarah Johnson",
      propertyId: 1
    }
  ];

  const propertyStatuses = [
    { value: "available", label: "Available", color: "bg-green-100 text-green-800" },
    { value: "interested", label: "Interested Buyers", color: "bg-blue-100 text-blue-800" },
    { value: "reserved", label: "Reserved", color: "bg-yellow-100 text-yellow-800" },
    { value: "under-contract", label: "Under Contract", color: "bg-orange-100 text-orange-800" },
    { value: "sold", label: "Sold", color: "bg-purple-100 text-purple-800" },
    { value: "rented", label: "Rented", color: "bg-indigo-100 text-indigo-800" }
  ];

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "apartment", label: "Apartment" },
    { value: "commercial", label: "Commercial" }
  ];

  const realEstateAgents = [
    { value: "sarah-johnson", label: "Sarah Johnson" },
    { value: "mike-davis", label: "Mike Davis" },
    { value: "lisa-chen", label: "Lisa Chen" },
    { value: "john-smith", label: "John Smith" }
  ];

  useEffect(() => {
    // Simulate loading property data
    setIsLoading(true);
    setTimeout(() => {
      const property = mockProperties?.find(p => p?.id === parseInt(propertyId)) || mockProperties?.[0];
      setSelectedProperty(property);
      setIsLoading(false);
    }, 500);
  }, [propertyId]);

  const handleSaveProperty = async (propertyData) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedProperty({ ...selectedProperty, ...propertyData });
      console.log('Property saved:', propertyData);
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProperty = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/real-estate-dashboard');
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleCloneProperty = () => {
    const clonedProperty = {
      ...selectedProperty,
      id: Date.now(),
      title: `${selectedProperty?.title} (Copy)`,
      status: "available",
      createdAt: new Date()?.toISOString()
    };
    console.log('Property cloned:', clonedProperty);
  };

  const handleScheduleShowing = () => {
    console.log('Scheduling showing for property:', selectedProperty?.id);
  };

  const getActivitiesForProperty = (propertyId) => {
    return mockActivities?.filter(activity => activity?.propertyId === propertyId);
  };

  const getDocumentsForProperty = (propertyId) => {
    return mockDocuments?.filter(doc => doc?.propertyId === propertyId);
  };

  const getClientForProperty = (clientId) => {
    return mockClients?.find(client => client?.id === clientId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="text-text-secondary">Loading property...</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <Breadcrumb />
              <div className="text-center py-12">
                <Icon name="Home" size={48} className="text-text-tertiary mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-text-primary mb-2">Property Not Found</h2>
                <p className="text-text-secondary mb-6">The property you're looking for doesn't exist or has been removed.</p>
                <button
                  onClick={() => navigate('/real-estate-dashboard')}
                  className="btn-primary"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {selectedProperty?.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>Property ID: #{selectedProperty?.id}</span>
                  <span>•</span>
                  <span>Listed: {new Date(selectedProperty.createdAt)?.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Last updated: {new Date(selectedProperty.updatedAt)?.toLocaleDateString()}</span>
                </div>
              </div>
              
              <PropertyActions
                onSave={() => handleSaveProperty(selectedProperty)}
                onDelete={() => setShowDeleteModal(true)}
                onClone={handleCloneProperty}
                onScheduleShowing={handleScheduleShowing}
                isSaving={isSaving}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Left Panel - Property Form */}
              <div className="xl:col-span-8">
                <PropertyForm
                  property={selectedProperty}
                  clients={mockClients}
                  statuses={propertyStatuses}
                  propertyTypes={propertyTypes}
                  agents={realEstateAgents}
                  onSave={handleSaveProperty}
                  isSaving={isSaving}
                />
              </div>

              {/* Right Panel - Activity & Documents */}
              <div className="xl:col-span-4 space-y-6">
                <ActivityTimeline
                  activities={getActivitiesForProperty(selectedProperty?.id)}
                  client={getClientForProperty(selectedProperty?.clientId)}
                />
                
                <DocumentsSection
                  documents={getDocumentsForProperty(selectedProperty?.id)}
                  propertyId={selectedProperty?.id}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-50 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Delete Property</h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete "{selectedProperty?.title}"? This action cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProperty}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error-600 transition-colors duration-150"
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;