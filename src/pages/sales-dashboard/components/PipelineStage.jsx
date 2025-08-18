import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PipelineStage = ({ stage, totalValue, weightedValue, isPropertyPipeline = false }) => {
  const getStageColor = (stageId) => {
    if (isPropertyPipeline) {
      const colors = {
        'available': 'bg-blue-50 border-blue-300',
        'interested': 'bg-yellow-50 border-yellow-300',
        'reserved': 'bg-purple-50 border-purple-300',
        'negotiation': 'bg-orange-50 border-orange-300',
        'sold': 'bg-green-50 border-green-300'
      };
      return colors?.[stageId] || 'bg-gray-100 border-gray-300';
    }
    
    const colors = {
      'lead': 'bg-gray-100 border-gray-300',
      'qualified': 'bg-blue-50 border-blue-300',
      'proposal': 'bg-yellow-50 border-yellow-300',
      'negotiation': 'bg-orange-50 border-orange-300',
      'closed': 'bg-green-50 border-green-300'
    };
    return colors?.[stageId] || 'bg-gray-100 border-gray-300';
  };

  const getStageIcon = (stageId) => {
    if (isPropertyPipeline) {
      const icons = {
        'available': 'Home',
        'interested': 'Eye',
        'reserved': 'Lock',
        'negotiation': 'MessageSquare',
        'sold': 'Trophy'
      };
      return icons?.[stageId] || 'Circle';
    }
    
    const icons = {
      'lead': 'UserPlus',
      'qualified': 'CheckCircle',
      'proposal': 'FileText',
      'negotiation': 'MessageSquare',
      'closed': 'Trophy'
    };
    return icons?.[stageId] || 'Circle';
  };

  const items = isPropertyPipeline ? stage?.properties : stage?.deals;
  const itemCount = items?.length || 0;

  return (
    <div className={`rounded-lg border-2 border-dashed p-4 ${getStageColor(stage?.id)}`}>
      {/* Stage Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name={getStageIcon(stage?.id)} size={16} className="text-text-secondary" />
          <h3 className="font-medium text-text-primary">{stage?.title}</h3>
        </div>
        <span className="text-sm font-medium text-text-secondary">
          {itemCount}
        </span>
      </div>
      {/* Stage Metrics */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary">Total:</span>
          <span className="font-medium text-text-primary">
            ${(totalValue / 1000)?.toFixed(0)}K
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary">Ponderado:</span>
          <span className="font-medium text-text-primary">
            ${(weightedValue / 1000)?.toFixed(0)}K
          </span>
        </div>
      </div>
      {/* Droppable Area */}
      <Droppable droppableId={stage?.id}>
        {(provided, snapshot) => (
          <div
            ref={provided?.innerRef}
            {...provided?.droppableProps}
            className={`min-h-[200px] space-y-3 ${
              snapshot?.isDraggingOver ? 'bg-primary-50 border-primary-300' : ''
            }`}
          >
            {items?.map((item, index) => (
              <Draggable key={item?.id} draggableId={item?.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided?.innerRef}
                    {...provided?.draggableProps}
                    {...provided?.dragHandleProps}
                    className={`bg-surface rounded-lg p-3 border border-border shadow-sm cursor-move transition-all duration-150 hover:shadow-md ${
                      snapshot?.isDragging ? 'rotate-2 shadow-lg' : ''
                    }`}
                  >
                    {/* Item Header */}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-text-primary line-clamp-2">
                        {item?.title}
                      </h4>
                      <Icon name="GripVertical" size={14} className="text-text-tertiary mt-1" />
                    </div>

                    {/* Item Value/Price */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-text-primary">
                        ${((item?.value || item?.price) / 1000)?.toFixed(0)}K
                      </span>
                      <span className="text-xs px-2 py-1 bg-primary-50 text-primary rounded-full">
                        {item?.probability}%
                      </span>
                    </div>

                    {/* Contact/Agent Info */}
                    <div className="flex items-center space-x-2 mb-2">
                      <Image
                        src={item?.avatar || '/assets/images/no_image.png'}
                        alt={item?.contact || item?.agent}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-text-primary truncate">
                          {item?.contact || item?.agent}
                        </p>
                        <p className="text-xs text-text-secondary truncate">
                          {item?.company || item?.propertyType}
                        </p>
                      </div>
                    </div>

                    {/* Additional Property Info for Real Estate */}
                    {isPropertyPipeline && item?.bedrooms && (
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                        <span>{item?.bedrooms} hab • {item?.bathrooms} baños</span>
                        <span>{item?.sqft?.toLocaleString()} ft²</span>
                      </div>
                    )}

                    {/* Item Metadata */}
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>
                        {isPropertyPipeline 
                          ? `${item?.daysOnMarket} días en mercado`
                          : `${item?.daysInStage} días en etapa`
                        }
                      </span>
                      <span>{item?.lastActivity}</span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided?.placeholder}
            
            {/* Empty State */}
            {itemCount === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-text-tertiary">
                <Icon name="Plus" size={24} className="mb-2" />
                <span className="text-xs">
                  {isPropertyPipeline ? 'Arrastra propiedades aquí' : 'Arrastra negociaciones aquí'}
                </span>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default PipelineStage;