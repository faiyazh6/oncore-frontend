import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import styles from './DandPButtons.module.css';

const DandPButtons = ({ className, onDownload, onPrint }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Button onClick={onDownload} leftIcon={<FaDownload />} className={styles.customButton}>
          Download
        </Button>
      </div>
      <div>
        <Button onClick={onPrint} leftIcon={<FaPrint />} className={styles.customButton}>
          Print
        </Button>
      </div>
    </div>
  );
};

export default DandPButtons;