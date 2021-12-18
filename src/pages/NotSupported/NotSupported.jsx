/**
 * NotSupported React Component which will display the alert to upgrade browser
 *
 * @author Hyecheol (Jerry) Jang
 */

import * as React from 'react';

const NotSupported = () => {
  return (
    <div style={{ maxWidth: '1000px', padding: '0 20px' }}>
      <h1 style={{ fontSize: '30px' }}>Not Supported Browser</h1>
      <p style={{ fontSize: '18px' }}>
        This webpage only supports on "modern" browsers. Please update or
        download newer version of browser. We do not support outdated browsers
        due to security concerns.
      </p>
      <p style={{ fontSize: '18px' }}>
        We recommend you to use Microsoft Edge, Google Chrome (or any other
        Chromium-based browsers) and Mozilla Firefox. It is also okay to use
        Apple Safari, but note that some features may not work properly on
        Safari. If you see this message again though you visited this website
        using the latest version of Apple Safari, please visit the website again
        with Google Chrome.
      </p>
      <p style={{ fontSize: '18px' }}>
        The download links to the recommend browsers are listed below.
      </p>
      <p style={{ fontSize: '18px', lineHeight: '24px' }}>
        Microsoft Edge:{' '}
        <a
          href="https://www.microsoft.com/en-us/edge"
          style={{ color: 'blue' }}
        >
          https://www.microsoft.com/en-us/edge
        </a>
        <br />
        Google Chrome:{' '}
        <a href="https://www.google.com/chrome/" style={{ color: 'blue' }}>
          https://www.google.com/chrome/
        </a>
        <br />
        Mozilla Firefox:{' '}
        <a
          href="https://www.mozilla.org/firefox/new/"
          style={{ color: 'blue' }}
        >
          https://www.mozilla.org/firefox/new/
        </a>
      </p>
    </div>
  );
};

export default NotSupported;
