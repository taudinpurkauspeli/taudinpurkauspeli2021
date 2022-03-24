/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useTranslation } from 'react-i18next';
import filesService from './filesService';

const PrivacyNotice = () => {
  const { t } = useTranslation();
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(async () => {
    const fetchedPdf = await filesService.getPrivacyNotice();
    setPdf({
      data: fetchedPdf,
    });
  }, []);

  // eslint-disable-next-line no-shadow
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <div id="wrapper">
      <div>
        <p>
          {t('page')}
          &nbsp;
          {pageNumber || (numPages ? 1 : '--')}
          {t('of')}
          {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          {t('previous')}
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          {t('next')}
        </button>
      </div>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PrivacyNotice;
