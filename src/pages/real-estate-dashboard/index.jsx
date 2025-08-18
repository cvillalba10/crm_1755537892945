import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import RecentActivity from '../sales-dashboard/components/RecentActivity';
import QuickActions from '../sales-dashboard/components/QuickActions';
import UpcomingTasks from '../sales-dashboard/components/UpcomingTasks';
import PipelineStage from '../sales-dashboard/components/PipelineStage';
import PerformanceMetrics from '../sales-dashboard/components/PerformanceMetrics';

const RealEstateDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('thisMonth');
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');
  const [selectedTerritory, setSelectedTerritory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for real estate pipeline stages
  const initialPipelineData = {
    'available': {
      id: 'available',
      title: 'Disponible',
      properties: [
        {
          id: 'property-1',
          title: 'Casa Familiar Moderna - Calle del Roble',
          price: 450000,
          probability: 90,
          agent: 'Sarah Johnson',
          propertyType: 'Casa',
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2500,
          address: '123 Calle del Roble, Centro',
          daysOnMarket: 5,
          lastActivity: 'Hace 2 horas'
        },
        {
          id: 'property-2',
          title: 'Departamento Centro - Vista Ciudad',
          price: 280000,
          probability: 85,
          agent: 'Mike Davis',
          propertyType: 'Departamento',
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1200,
          address: '456 Av. Pino, Unidad 15B',
          daysOnMarket: 3,
          lastActivity: 'Hace 1 día'
        }
      ]
    },
    'interested': {
      id: 'interested',
      title: 'Interesados',
      properties: [
        {
          id: 'property-3',
          title: 'Villa Suburbana - Avenida Arce',
          price: 750000,
          probability: 70,
          agent: 'Lisa Chen',
          propertyType: 'Villa',
          bedrooms: 5,
          bathrooms: 4,
          sqft: 3200,
          address: '789 Avenida Arce, Suburbios',
          daysOnMarket: 12,
          lastActivity: 'Hace 3 horas'
        },
        {
          id: 'property-4',
          title: 'Loft Urbano - Distrito Artístico',
          price: 320000,
          probability: 65,
          agent: 'John Smith',
          propertyType: 'Loft',
          bedrooms: 1,
          bathrooms: 1,
          sqft: 800,
          address: '321 Blvd. Artístico, Loft 3A',
          daysOnMarket: 8,
          lastActivity: 'Hace 5 horas'
        }
      ]
    },
    'reserved': {
      id: 'reserved',
      title: 'Reservada',
      properties: [
        {
          id: 'property-5',
          title: 'Mansión Ejecutiva - Vista Colina',
          price: 1250000,
          probability: 95,
          agent: 'David Wilson',
          propertyType: 'Mansión',
          bedrooms: 6,
          bathrooms: 5,
          sqft: 4500,
          address: '555 Urbanización Vista Colina',
          daysOnMarket: 15,
          lastActivity: 'Hace 1 hora'
        }
      ]
    },
    'negotiation': {
      id: 'negotiation',
      title: 'En Negociación',
      properties: [
        {
          id: 'property-6',
          title: 'Propiedad Frente al Lago',
          price: 850000,
          probability: 80,
          agent: 'Emily Rodriguez',
          propertyType: 'Casa',
          bedrooms: 4,
          bathrooms: 3,
          sqft: 2800,
          address: '999 Av. Orilla del Lago',
          daysOnMarket: 7,
          lastActivity: 'Hace 30 minutos'
        }
      ]
    },
    'sold': {
      id: 'sold',
      title: 'Vendida',
      properties: [
        {
          id: 'property-7',
          title: 'Casa Acogedora - Valle Verde',
          price: 380000,
          probability: 100,
          agent: 'Alex Martinez',
          propertyType: 'Casa Adosada',
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1800,
          address: '777 Calle Valle Verde',
          daysOnMarket: 2,
          lastActivity: 'Recién vendida'
        }
      ]
    }
  };

  const [pipelineData, setPipelineData] = useState(initialPipelineData);

  // Mock data for monthly sales and pricing trends
  const salesData = [
    { month: 'Ene', sales: 45, avgPrice: 420000 },
    { month: 'Feb', sales: 52, avgPrice: 485000 },
    { month: 'Mar', sales: 48, avgPrice: 462000 },
    { month: 'Abr', sales: 59, avgPrice: 498000 },
    { month: 'May', sales: 64, avgPrice: 545000 },
    { month: 'Jun', sales: 71, avgPrice: 575000 }
  ];

  // Mock data for performance metrics
  const performanceData = {
    activeProperties: 127,
    soldThisMonth: 23,
    avgDaysOnMarket: 28,
    avgSalePrice: 485000,
    totalRevenue: 11155000,
    conversionRate: 68.5
  };

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination?.droppableId === source?.droppableId && destination?.index === source?.index) {
      return;
    }

    const sourceStage = pipelineData?.[source?.droppableId];
    const destStage = pipelineData?.[destination?.droppableId];
    const draggedProperty = sourceStage?.properties?.find(property => property?.id === draggableId);

    // Update probability based on stage
    const stageProbs = {
      'available': 90,
      'interested': 70,
      'reserved': 95,
      'negotiation': 80,
      'sold': 100
    };

    const updatedProperty = {
      ...draggedProperty,
      probability: stageProbs?.[destination?.droppableId] || draggedProperty?.probability,
      daysOnMarket: draggedProperty?.daysOnMarket + 1
    };

    // Remove from source
    const newSourceProperties = sourceStage?.properties?.filter(property => property?.id !== draggableId);
    
    // Add to destination
    const newDestProperties = [...destStage?.properties];
    newDestProperties?.splice(destination?.index, 0, updatedProperty);

    setPipelineData({
      ...pipelineData,
      [source?.droppableId]: {
        ...sourceStage,
        properties: newSourceProperties
      },
      [destination?.droppableId]: {
        ...destStage,
        properties: newDestProperties
      }
    });
  };

  // Calculate pipeline totals
  const calculateStageTotal = (stage) => {
    return stage?.properties?.reduce((total, property) => total + property?.price, 0);
  };

  const totalPipelineValue = Object.values(pipelineData)?.reduce((total, stage) => 
    total + calculateStageTotal(stage), 0
  );

  const totalActiveProperties = Object.values(pipelineData)?.filter(stage => stage?.id !== 'sold')?.reduce((total, stage) => total + stage?.properties?.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Dashboard Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Panel Inmobiliario</h1>
              <p className="text-text-secondary">
                Última actualización: {lastUpdated?.toLocaleTimeString()} • Actualización automática cada 5 minutos
              </p>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e?.target?.value)}
                className="input-field text-sm"
              >
                <option value="thisWeek">Esta Semana</option>
                <option value="thisMonth">Este Mes</option>
                <option value="thisQuarter">Este Trimestre</option>
                <option value="thisYear">Este Año</option>
              </select>
              
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e?.target?.value)}
                className="input-field text-sm"
              >
                <option value="all">Todos los Tipos</option>
                <option value="house">Casas</option>
                <option value="condo">Departamentos</option>
                <option value="townhouse">Casas Adosadas</option>
                <option value="villa">Villas</option>
              </select>
              
              <select
                value={selectedTerritory}
                onChange={(e) => setSelectedTerritory(e?.target?.value)}
                className="input-field text-sm"
              >
                <option value="all">Todas las Áreas</option>
                <option value="downtown">Centro</option>
                <option value="suburbs">Suburbios</option>
                <option value="waterfront">Frente al Agua</option>
                <option value="hillside">Ladera</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-normal">Propiedades Activas</p>
                  <p className="text-2xl font-normal text-text-primary">
                    {performanceData?.activeProperties}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={24} className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-normal">Ventas Este Mes</p>
                  <p className="text-2xl font-normal text-text-primary">
                    {performanceData?.soldThisMonth}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-normal">Precio Promedio</p>
                  <p className="text-2xl font-normal text-text-primary">
                    ${(performanceData?.avgSalePrice / 1000)?.toFixed(0)}K
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-secondary" />
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm font-normal">Días Promedio en Mercado</p>
                  <p className="text-2xl font-normal text-text-primary">{performanceData?.avgDaysOnMarket}</p>
                </div>
                <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Pipeline Section */}
            <div className="xl:col-span-3 space-y-8">
              {/* Interactive Pipeline */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-normal text-text-primary">Pipeline de Propiedades</h2>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="RefreshCw" size={16} />
                    <span>Arrastra las propiedades para actualizar las etapas</span>
                  </div>
                </div>
                
                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.values(pipelineData)?.map((stage) => (
                      <PipelineStage
                        key={stage?.id}
                        stage={stage}
                        totalValue={calculateStageTotal(stage)}
                        weightedValue={calculateStageTotal(stage)}
                        isPropertyPipeline={true}
                      />
                    ))}
                  </div>
                </DragDropContext>
              </div>

              {/* Sales & Pricing Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h2 className="text-xl font-normal text-text-primary mb-6">Ventas Mensuales</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          formatter={(value) => [value, 'Ventas']}
                          labelStyle={{ color: '#1F2937' }}
                        />
                        <Bar dataKey="sales" fill="var(--color-primary)" name="Propiedades Vendidas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-normal text-text-primary mb-6">Precio Promedio de Venta</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" tickFormatter={(value) => `$${value / 1000}K`} />
                        <Tooltip 
                          formatter={(value) => [`$${value?.toLocaleString()}`, 'Precio Prom.']}
                          labelStyle={{ color: '#1F2937' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgPrice" 
                          stroke="var(--color-success)" 
                          strokeWidth={3}
                          dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <PerformanceMetrics data={performanceData} />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions />
              
              {/* Upcoming Tasks */}
              <UpcomingTasks />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealEstateDashboard;