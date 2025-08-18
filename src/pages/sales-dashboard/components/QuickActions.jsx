import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  const quickActions = [
    {
      id: 'add-deal',
      title: 'Agregar Propiedad',
      description: 'Crear nueva oportunidad de venta',
      icon: 'Plus',
      color: 'bg-primary text-white',
      hoverColor: 'hover:bg-primary-700',
      action: () => setShowAddDealModal(true)
    },
    {
      id: 'add-contact',
      title: 'Agregar Cliente',
      description: 'Añadir nuevo cliente potencial',
      icon: 'UserPlus',
      color: 'bg-success text-white',
      hoverColor: 'hover:bg-success-600',
      action: () => setShowAddContactModal(true)
    },
    {
      id: 'schedule-meeting',
      title: 'Programar Cita',
      description: 'Agendar visita o reunión',
      icon: 'Calendar',
      color: 'bg-accent text-white',
      hoverColor: 'hover:bg-accent-600',
      action: () => window.open('https://calendar.google.com', '_blank')
    },
    {
      id: 'send-email',
      title: 'Enviar Email',
      description: 'Redactar y enviar correo',
      icon: 'Mail',
      color: 'bg-secondary text-white',
      hoverColor: 'hover:bg-secondary-600',
      action: () => window.open('mailto:', '_blank')
    }
  ];

  const shortcuts = [
    { title: 'Gestión de Propiedades', path: '/deal-management', icon: 'Target' },
    { title: 'Gestión de Clientes', path: '/contact-management', icon: 'Users' },
    { title: 'Análisis Pipeline', path: '/pipeline-analytics', icon: 'TrendingUp' },
    { title: 'Línea de Tiempo', path: '/activity-timeline', icon: 'Clock' }
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Acciones Rápidas</h3>
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className={`${action?.color} ${action?.hoverColor} p-4 rounded-lg transition-all duration-150 text-left group`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={action?.icon} size={20} />
              <span className="font-medium text-sm">{action?.title}</span>
            </div>
            <p className="text-xs opacity-90">{action?.description}</p>
          </button>
        ))}
      </div>
      {/* Quick Navigation */}
      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-medium text-text-primary mb-4">Navegación Rápida</h4>
        <div className="space-y-2">
          {shortcuts?.map((shortcut) => (
            <Link
              key={shortcut?.path}
              to={shortcut?.path}
              className="flex items-center space-x-3 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-150"
            >
              <Icon name={shortcut?.icon} size={16} />
              <span className="text-sm">{shortcut?.title}</span>
              <Icon name="ChevronRight" size={14} className="ml-auto" />
            </Link>
          ))}
        </div>
      </div>
      {/* Add Deal Modal */}
      {showAddDealModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Agregar Nueva Propiedad</h3>
              <button
                onClick={() => setShowAddDealModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Título de la Propiedad
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ingresa el título de la propiedad"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Dirección completa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Precio
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="0"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-150"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  onClick={() => setShowAddDealModal(false)}
                >
                  Crear Propiedad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Agregar Nuevo Cliente</h3>
              <button
                onClick={() => setShowAddContactModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ingresa el nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="correo@empresa.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Número de teléfono"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-150"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  onClick={() => setShowAddContactModal(false)}
                >
                  Agregar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;