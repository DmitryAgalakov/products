import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface Props {
  label: string;
  disableInteractive?: boolean;
}

export function TypographyWithTooltip(props: Props & TypographyProps) {
  const { label, sx, disableInteractive, ...typographyProps } = props;

  const [tooltipEnabled, setTooltipEnabled] = useState(false);

  const needShow = (e: React.MouseEvent) => {
    if (e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
      setTooltipEnabled(true);
    }
  };

  return (
    <Tooltip title={label} open={tooltipEnabled} onClose={() => setTooltipEnabled(false)} disableInteractive={disableInteractive}>
      <Typography noWrap sx={{ ...sx }} {...typographyProps} onMouseEnter={needShow}>
        {label}
      </Typography>
    </Tooltip>
  );
}
