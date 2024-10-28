export interface HardwareSpec {
    type: 'CPU' | 'GPU' | 'RAM';
    modelName: string;
    iconSrc: string;
  }

  
export interface StyledIconContainerProps {
  type: 'CPU' | 'GPU' | 'RAM';
}