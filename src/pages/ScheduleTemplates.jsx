import React, { useRef } from 'react';
import ScheduleTabs from '../components/schedule-templates/ScheduleTabs';
import NavButtons from '../components/schedule-templates/NavButtons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../index.css'; // Import global styles
import { Button } from '@chakra-ui/react';
import { FaDownload, FaPrint } from 'react-icons/fa';
import styles from '../components/schedule-templates/DandPButtons.module.css';

function ScheduleTemplates() {
  const pageRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(pageRef.current, {
      scale: 2,
      useCORS: true
    });
    const dataUrl = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('schedule-templates.pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={pageRef} className="schedule-templates-container">
      <div className="lg:pl-64">
        <div className="my-5 flex h-auto sm:h-16 flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-4 sm:px-6 lg:px-8 print-hidden">
          <h1 className="font-bold text-4xl font-manrope text-custom-blue mb-4 sm:mb-0">Schedule Templates</h1>
          <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
            <Button onClick={handleDownload} leftIcon={<FaDownload />} className={styles.customButton}>
              Download
            </Button>
            <Button onClick={handlePrint} leftIcon={<FaPrint />} className={styles.customButton}>
              Print
            </Button>
          </div>
        </div>

        <div className="bg-white px-4 sm:px-6 lg:px-8 print-hidden">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6">
            <NavButtons />
          </div>
        </div>

        <main className="py-10 print:block">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center print:text-left">
              <ScheduleTabs />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ScheduleTemplates;