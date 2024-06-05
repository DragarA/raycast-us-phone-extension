import { Action, ActionPanel, List, showToast, Toast, Clipboard } from "@raycast/api";
import React from "react";
import { useState } from "react";

function generateRandomPhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const centralOfficeCode = Math.floor(Math.random() * 900) + 100;
  const lineNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${areaCode}-${centralOfficeCode}-${lineNumber}`;
}

export default function Command() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const handleGenerate = async () => {
    const newPhoneNumber = generateRandomPhoneNumber();
    setPhoneNumber(newPhoneNumber);
    await showToast({
      style: Toast.Style.Success,
      title: "Copied to Clipboard",
      message: newPhoneNumber,
    });
    await Clipboard.copy(newPhoneNumber);
  };

  return (
    <List>
      <List.Item
        title="Generate Random US Phone Number"
        actions={
          <ActionPanel>
            <Action title="Generate" onAction={handleGenerate} />
          </ActionPanel>
        }
      />
      {phoneNumber && <List.Item title="Last Generated Phone Number" subtitle={phoneNumber} />}
    </List>
  );
}
