import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import BiotechIcon from '@mui/icons-material/Biotech';
import Button from '@mui/joy/Button';
export default function InteractiveCard() {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 220,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90, backgroundColor:"null"}}>
        
        <BiotechIcon/>
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          Lab Report
        </Typography>
        <Typography
          level="body-sm"
          aria-describedby="card-description"
          sx={{ mb: 1 }}
        >
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            <Button variant="solid" sx={{backgroundColor:'#0C1844', marginTop:"15px"}}>
            Proceed
        </Button>
          </Link>
        </Typography>
        
      </CardContent>
    </Card>
  );
}
