import React from "react";

const ObfuscatedEmail = ({ email, className }) => {
  if (!email) return null;

  const separatorIndex = email.indexOf("@");

  if (separatorIndex === -1) {
    return <span className={className}>{email}</span>;
  }

  const localPart = email.slice(0, separatorIndex);
  const domain = email.slice(separatorIndex + 1);

  return (
    <span className={className}>
      {localPart} [at] {domain}
    </span>
  );
};

export default ObfuscatedEmail;
