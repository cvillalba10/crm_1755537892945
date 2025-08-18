import React, { useState, useEffect } from 'react';

import Icon from 'components/AppIcon';

import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import ClientList from './components/ClientList';
import ClientDetail from './components/ClientDetail';
import ClientForm from './components/ClientForm';
import ImportClientsModal from './components/ImportClientsModal';
import ExportClientsModal from './components/ExportClientsModal';
import MergeDuplicatesModal from '../contact-management/components/MergeDuplicatesModal';
import FilterPanel from '../contact-management/components/FilterPanel';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    clientType: [],
    propertyType: [],
    budgetRange: [],
    lastContactDate: null
  });

  // Mock data for real estate clients
  const mockClients = [
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      clientType: "buyer",
      propertyInterest: "House",
      budget: { min: 400000, max: 600000 },
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      lastContactDate: "2023-06-15T14:30:00",
      status: "active",
      tags: ["first-time-buyer", "pre-approved", "urgent"],
      properties: [
        { id: 101, title: "Modern Family Home - Oak Street", price: 450000, status: "interested" },
        { id: 102, title: "Suburban Villa - Maple Drive", price: 520000, status: "viewed" }
      ],
      notes: "Sarah is a first-time homebuyer with pre-approval. Looking for move-in ready properties in good school districts.",
      preferences: {
        bedrooms: { min: 3, max: 4 },
        bathrooms: { min: 2, max: 3 },
        propertyTypes: ["House", "Townhouse"],
        locations: ["Downtown", "Suburbs"],
        mustHave: ["Garage", "Garden", "Near schools"]
      },
      activities: [
        {
          id: 1001,
          type: "showing",
          date: "2023-06-15T14:30:00",
          subject: "Property showing scheduled",
          content: "Scheduled showing for Modern Family Home on Oak Street for Saturday 2 PM."
        },
        {
          id: 1002,
          type: "call",
          date: "2023-06-10T11:15:00",
          duration: 25,
          summary: "Discussed budget and neighborhood preferences. Refined search criteria."
        },
        {
          id: 1003,
          type: "email",
          date: "2023-05-28T09:00:00",
          subject: "Property listings sent",
          content: "Sent curated list of 5 properties matching criteria in preferred neighborhoods."
        }
      ],
      customFields: {
        preferredContactMethod: "email",
        timeline: "3-6 months",
        financeStatus: "Pre-approved",
        currentSituation: "Renting"
      }
    },
    {
      id: 2,
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      clientType: "seller",
      propertyInterest: "Condo",
      budget: { min: 0, max: 0 }, // Seller doesn't have a budget
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      lastContactDate: "2023-06-18T10:15:00",
      status: "active",
      tags: ["relocating", "corporate", "investor"],
      properties: [
        { id: 103, title: "Downtown Condo - City View", price: 280000, status: "listed" }
      ],
      notes: "Michael is relocating for work and needs to sell his downtown condo quickly. Flexible on price for quick sale.",
      preferences: {
        timeline: "ASAP",
        priceFlexibility: "Flexible",
        reasonForSelling: "Relocation",
        desiredSaleDate: "Within 60 days"
      },
      activities: [
        {
          id: 1004,
          type: "listing",
          date: "2023-06-18T10:15:00",
          subject: "Property listed",
          content: "Downtown condo officially listed at $280,000. Professional photos and staging completed."
        },
        {
          id: 1005,
          type: "meeting",
          date: "2023-06-05T13:30:00",
          duration: 45,
          summary: "Initial consultation and property valuation. Discussed market analysis and pricing strategy."
        }
      ],
      customFields: {
        preferredContactMethod: "phone",
        timeline: "Urgent (60 days)",
        currentProperty: "Downtown Condo",
        reasonForSelling: "Job relocation"
      }
    },
    {
      id: 3,
      firstName: "Jessica",
      lastName: "Martinez",
      email: "jessica.martinez@email.com",
      phone: "+1 (555) 234-5678",
      clientType: "buyer",
      propertyInterest: "Villa",
      budget: { min: 600000, max: 900000 },
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      lastContactDate: "2023-06-20T15:45:00",
      status: "active",
      tags: ["luxury", "family", "established"],
      properties: [
        { id: 104, title: "Executive Mansion - Hill View", price: 850000, status: "offer-made" },
        { id: 105, title: "Luxury Villa - Garden Estate", price: 750000, status: "interested" }
      ],
      notes: "Jessica is looking for a luxury family home with extensive outdoor space. Has specific requirements for entertaining areas.",
      preferences: {
        bedrooms: { min: 4, max: 6 },
        bathrooms: { min: 3, max: 5 },
        propertyTypes: ["Villa", "Mansion"],
        locations: ["Hillside", "Garden District"],
        mustHave: ["Pool", "Large kitchen", "Guest rooms", "Home office"]
      },
      activities: [
        {
          id: 1006,
          type: "offer",
          date: "2023-06-20T15:45:00",
          subject: "Offer submitted",
          content: "Submitted offer of $825,000 for Executive Mansion on Hill View. Awaiting seller response."
        },
        {
          id: 1007,
          type: "showing",
          date: "2023-06-12T09:20:00",
          duration: 90,
          summary: "Extended showing of Executive Mansion. Client very interested in property features and location."
        }
      ],
      customFields: {
        preferredContactMethod: "text",
        timeline: "6-9 months",
        financeStatus: "Cash buyer",
        currentSituation: "Upgrading"
      }
    },
    {
      id: 4,
      firstName: "Robert",
      lastName: "Williams",
      email: "robert.williams@email.com",
      phone: "+1 (555) 876-5432",
      clientType: "investor",
      propertyInterest: "Commercial",
      budget: { min: 200000, max: 500000 },
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      lastContactDate: "2023-06-14T11:00:00",
      status: "inactive",
      tags: ["investor", "commercial", "rental"],
      properties: [
        { id: 106, title: "Commercial Space - Main Street", price: 350000, status: "analyzing" }
      ],
      notes: "Robert is a seasoned investor looking for commercial properties with good rental potential. Prefers turnkey investments.",
      preferences: {
        propertyTypes: ["Commercial", "Multi-family"],
        locations: ["Downtown", "Business District"],
        investmentCriteria: "Positive cash flow",
        managementPreference: "Turnkey"
      },
      activities: [
        {
          id: 1008,
          type: "analysis",
          date: "2023-06-14T11:00:00",
          subject: "Investment analysis",
          content: "Completed ROI analysis for Main Street commercial space. Projected 8% annual return."
        },
        {
          id: 1009,
          type: "meeting",
          date: "2023-05-30T14:00:00",
          duration: 60,
          summary: "Investment strategy discussion. Reviewed portfolio goals and risk tolerance."
        }
      ],
      customFields: {
        preferredContactMethod: "email",
        timeline: "Flexible",
        investmentType: "Commercial real estate",
        portfolioSize: "5+ properties"
      }
    },
    {
      id: 5,
      firstName: "Emily",
      lastName: "Taylor",
      email: "emily.taylor@email.com",
      phone: "+1 (555) 345-6789",
      clientType: "buyer",
      propertyInterest: "Townhouse",
      budget: { min: 300000, max: 450000 },
      avatar: "https://randomuser.me/api/portraits/women/15.jpg",
      lastContactDate: "2023-06-19T13:30:00",
      status: "active",
      tags: ["young-professional", "condo-to-house", "growing-family"],
      properties: [
        { id: 107, title: "Modern Townhouse - Green Valley", price: 380000, status: "negotiating" }
      ],
      notes: "Emily is a young professional looking to upgrade from her current condo to a townhouse. Growing family needs more space.",
      preferences: {
        bedrooms: { min: 2, max: 3 },
        bathrooms: { min: 2, max: 3 },
        propertyTypes: ["Townhouse", "Small House"],
        locations: ["Green Valley", "Midtown"],
        mustHave: ["Modern kitchen", "Parking", "Low maintenance"]
      },
      activities: [
        {
          id: 1010,
          type: "negotiation",
          date: "2023-06-19T13:30:00",
          subject: "Price negotiation",
          content: "Negotiating price for Green Valley townhouse. Seller considering our offer of $375,000."
        },
        {
          id: 1011,
          type: "inspection",
          date: "2023-06-08T10:45:00",
          duration: 120,
          summary: "Home inspection completed. Minor issues identified, negotiating repairs with seller."
        }
      ],
      customFields: {
        preferredContactMethod: "phone",
        timeline: "3-4 months",
        financeStatus: "Approved",
        currentSituation: "Condo owner"
      }
    }
  ];

  // Load mock data on component mount
  useEffect(() => {
    setClients(mockClients);
    // Set first client as selected by default for desktop view
    if (mockClients?.length > 0 && window.innerWidth >= 1024) {
      setSelectedClient(mockClients?.[0]);
    }
  }, []);

  // Filter clients based on search query and filters
  const filteredClients = clients?.filter(client => {
    const fullName = `${client?.firstName} ${client?.lastName}`?.toLowerCase();
    const email = client?.email?.toLowerCase();
    const searchLower = searchQuery?.toLowerCase();
    
    const matchesSearch = fullName?.includes(searchLower) || 
                          email?.includes(searchLower) ||
                          client?.propertyInterest?.toLowerCase()?.includes(searchLower);
    
    // Apply additional filters
    const matchesClientType = filters?.clientType?.length === 0 || 
                              filters?.clientType?.includes(client?.clientType);
    
    const matchesPropertyType = filters?.propertyType?.length === 0 || 
                               filters?.propertyType?.includes(client?.propertyInterest);
    
    // Filter by active tab
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'buyers' && client?.clientType === 'buyer') ||
                      (activeTab === 'sellers' && client?.clientType === 'seller') ||
                      (activeTab === 'investors' && client?.clientType === 'investor') ||
                      (activeTab === 'active' && client?.status === 'active') ||
                      (activeTab === 'inactive' && client?.status === 'inactive');
    
    return matchesSearch && matchesClientType && matchesPropertyType && matchesTab;
  });

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setIsAddingClient(false);
    setIsEditingClient(false);
  };

  const handleClientMultiSelect = (clientId) => {
    setSelectedClients(prev => {
      if (prev?.includes(clientId)) {
        return prev?.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedClients?.length === filteredClients?.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients?.map(client => client?.id));
    }
  };

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsAddingClient(true);
    setIsEditingClient(false);
  };

  const handleEditClient = () => {
    setIsAddingClient(false);
    setIsEditingClient(true);
  };

  const handleSaveClient = (clientData) => {
    if (isAddingClient) {
      // Add new client
      const newClient = {
        id: clients?.length + 1,
        ...clientData,
        lastContactDate: new Date()?.toISOString(),
        status: 'active',
        properties: [],
        activities: []
      };
      
      setClients([...clients, newClient]);
      setSelectedClient(newClient);
    } else if (isEditingClient && selectedClient) {
      // Update existing client
      const updatedClients = clients?.map(client => 
        client?.id === selectedClient?.id ? { ...client, ...clientData } : client
      );
      
      setClients(updatedClients);
      setSelectedClient({ ...selectedClient, ...clientData });
    }
    
    setIsAddingClient(false);
    setIsEditingClient(false);
  };

  const handleCancelForm = () => {
    setIsAddingClient(false);
    setIsEditingClient(false);
    if (selectedClient === null && clients?.length > 0) {
      setSelectedClient(clients?.[0]);
    }
  };

  const handleDeleteClient = (clientId) => {
    const updatedClients = clients?.filter(client => client?.id !== clientId);
    setClients(updatedClients);
    
    if (selectedClient && selectedClient?.id === clientId) {
      setSelectedClient(updatedClients?.length > 0 ? updatedClients?.[0] : null);
    }
    
    setSelectedClients(prev => prev?.filter(id => id !== clientId));
  };

  const handleBulkDelete = () => {
    const updatedClients = clients?.filter(client => !selectedClients?.includes(client?.id));
    setClients(updatedClients);
    
    if (selectedClient && selectedClients?.includes(selectedClient?.id)) {
      setSelectedClient(updatedClients?.length > 0 ? updatedClients?.[0] : null);
    }
    
    setSelectedClients([]);
  };

  const handleImportClients = (importedClients) => {
    setClients([...clients, ...importedClients]);
    setIsImportModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Client Management</h1>
                <p className="text-text-secondary mt-1">Manage your buyers, sellers, and investor relationships</p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <button 
                  onClick={handleAddClient}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Icon name="UserPlus" size={18} />
                  <span>Add Client</span>
                </button>
                
                <button 
                  onClick={() => setIsImportModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-150 ease-out"
                >
                  <Icon name="Upload" size={18} />
                  <span>Import</span>
                </button>
                
                <button 
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className={`inline-flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all duration-150 ease-out ${
                    Object.values(filters)?.some(f => Array.isArray(f) ? f?.length > 0 : f !== null) || isFilterPanelOpen
                      ? 'border-primary-500 bg-primary-50 text-primary' :'border-border text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon name="Filter" size={18} />
                  <span>Filter</span>
                  {Object.values(filters)?.some(f => Array.isArray(f) ? f?.length > 0 : f !== null) && (
                    <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                      {Object.values(filters)?.reduce((count, f) => count + (Array.isArray(f) ? f?.length : (f !== null ? 1 : 0)), 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Filter Panel */}
            {isFilterPanelOpen && (
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                onClose={() => setIsFilterPanelOpen(false)} 
              />
            )}
            
            {/* Search and Tabs */}
            <div className="mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={18} className="text-text-tertiary" />
                </div>
                <input
                  type="text"
                  placeholder="Search clients by name, email, or property interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="input-field pl-10"
                />
              </div>
              
              <div className="flex border-b border-border overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'all' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  All Clients
                </button>
                <button
                  onClick={() => setActiveTab('buyers')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'buyers' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Buyers
                </button>
                <button
                  onClick={() => setActiveTab('sellers')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'sellers' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sellers
                </button>
                <button
                  onClick={() => setActiveTab('investors')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'investors' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Investors
                </button>
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'active' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab('inactive')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'inactive' ?'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Client List (Left Panel) */}
              <div className="w-full lg:w-1/3 xl:w-1/4">
                <div className="bg-surface rounded-lg border border-border shadow-sm">
                  {/* List Header with Actions */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedClients?.length === filteredClients?.length && filteredClients?.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span className="ml-3 text-sm text-text-secondary">
                        {selectedClients?.length > 0 ? `${selectedClients?.length} selected` : `${filteredClients?.length} clients`}
                      </span>
                    </div>
                    
                    {selectedClients?.length > 0 && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setIsExportModalOpen(true)}
                          className="text-text-secondary hover:text-text-primary"
                          title="Export Selected"
                        >
                          <Icon name="Download" size={16} />
                        </button>
                        <button
                          onClick={handleBulkDelete}
                          className="text-error hover:text-error-600"
                          title="Delete Selected"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                        {selectedClients?.length === 2 && (
                          <button
                            onClick={() => setIsMergeModalOpen(true)}
                            className="text-text-secondary hover:text-text-primary"
                            title="Merge Clients"
                          >
                            <Icon name="GitMerge" size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Client List */}
                  <ClientList
                    clients={filteredClients}
                    selectedClient={selectedClient}
                    selectedClients={selectedClients}
                    onClientSelect={handleClientSelect}
                    onClientMultiSelect={handleClientMultiSelect}
                    onDeleteClient={handleDeleteClient}
                  />
                </div>
              </div>
              
              {/* Client Detail or Form (Right Panel) */}
              <div className="w-full lg:w-2/3 xl:w-3/4">
                {isAddingClient || isEditingClient ? (
                  <ClientForm
                    client={isEditingClient ? selectedClient : null}
                    onSave={handleSaveClient}
                    onCancel={handleCancelForm}
                    isEditing={isEditingClient}
                  />
                ) : selectedClient ? (
                  <ClientDetail
                    client={selectedClient}
                    onEdit={handleEditClient}
                    onDelete={() => handleDeleteClient(selectedClient?.id)}
                  />
                ) : (
                  <div className="bg-surface rounded-lg border border-border shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No Client Selected</h3>
                    <p className="text-text-secondary mb-6">Select a client from the list or add a new one to get started.</p>
                    <button
                      onClick={handleAddClient}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Icon name="UserPlus" size={18} />
                      <span>Add New Client</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      {isImportModalOpen && (
        <ImportClientsModal
          onImport={handleImportClients}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
      {isExportModalOpen && (
        <ExportClientsModal
          clients={clients?.filter(client => selectedClients?.includes(client?.id))}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
      {isMergeModalOpen && selectedClients?.length === 2 && (
        <MergeDuplicatesModal
          client1={clients?.find(c => c?.id === selectedClients?.[0])}
          client2={clients?.find(c => c?.id === selectedClients?.[1])}
          onMerge={(mergedClient) => {
            const updatedClients = clients?.filter(c => !selectedClients?.includes(c?.id));
            setClients([...updatedClients, mergedClient]);
            setSelectedClient(mergedClient);
            setSelectedClients([]);
            setIsMergeModalOpen(false);
          }}
          onClose={() => setIsMergeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ClientManagement;