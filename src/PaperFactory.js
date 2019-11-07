// factory function to create paper object given xml data fetched from PubMed API
function paperFactory(xml) {

  // create DOM parser for parsing xml code
  var oParser = new DOMParser();
  var oDOM = oParser.parseFromString(xml, "application/xml");

  // HANDLE TITLE
  const titleText = oDOM.querySelector('ArticleTitle');
  const title = titleText.textContent;

  // HANDLE AUTHORS
  const authorList = oDOM.querySelectorAll('AuthorList Author');
  const authorArr = Array.from(authorList);
  const authorShort = authorArr.slice(0,3);
  const authorsParsed = [];

  for (let i = 0; i < 3; i++) {
    const person = authorShort[i];
    const last = person.children[0].textContent;
    const initials = person.children[2].textContent;
    const full = last + ' ' + initials;
    authorsParsed[i] = full;
  }
  const authors = authorsParsed.join(', ');

  // HANDLE JOURNAL
  const journalText = oDOM.querySelector('ISOAbbreviation');
  // filter out periods from journal names
  const journal = journalText.textContent.replace(/[.]/g, '');

  // HANDLE YEAR
  const queryPubDateYear = oDOM.querySelector('PubDate Year');
  const queryYear = oDOM.querySelector('Year');
  let year;
  if (!queryPubDateYear) {
    year = queryYear.textContent;
  } else if ( queryPubDateYear !== null ) {
    year = queryPubDateYear.textContent;
  }

  // HANDLE TIMESTAMP
  const timestamp = Date.now();

  // HANDLE PUBMED ID
  const pubMed = oDOM.querySelector('PMID').textContent;

  // HANDLE ABSTRACT
  const abstractText = oDOM.querySelectorAll('AbstractText');
  let abstract;
  // handle different possible formatting
  if (!abstractText) {
    abstract = "(empty)";
    // abstract = null;
  } else if (abstractText.length === 1 && abstractText.attributes === undefined) {
    abstract = abstractText[0].textContent;
  } else if (abstractText.length > 1) {
    let abstractArr = [];
    abstractText.forEach(node => {
      const body = node.textContent;
      const label = node.attributes[0].value;
      // check if nodes does not include label attribute
      if (label === undefined) { 
        abstractArr.push(body) 
      } else if (label !== undefined) { 
      // otherwise, concatenate label and body
        abstractArr.push(label + ": " + body) 
      }
    })
    // join array together as abstract body
    abstract = abstractArr.join(' ');
  }

  const keywords = '...';
  const findings = '...';

  return { title, authors, journal, year, timestamp, pubMed, keywords, findings, abstract }
};

export default paperFactory;
