import { useEffect } from 'react';
import Typed from 'typed.js';

const useTyped = (targetSelector:any, options:any) => {
  useEffect(() => {
    const typed = new Typed(targetSelector, options);

    return () => {
      typed.destroy();
    };
  }, [targetSelector, options]);

  return null; 
};

export default useTyped;
