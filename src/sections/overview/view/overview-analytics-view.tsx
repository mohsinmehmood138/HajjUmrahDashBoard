import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Weekly sales"
            percent={2.6}
            total={714000}
            color="warning"
            icon={<div style={{ color: '#B76935', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <Iconify icon="solar:cart-3-bold" width={36} height={36} />
            </div>}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #B76935, #754125)',
              color: '#fff',
              boxShadow: '0 8px 16px 0 rgba(183, 105, 53, 0.24)',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="New users"
            percent={-0.1}
            total={1352831}
            color="warning"
            icon={<div style={{ color: '#B76935', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <Iconify icon="eva:search-fill" width={36} height={36} />
            </div>}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #A4734C, #663C21)',
              color: '#fff',
              boxShadow: '0 8px 16px 0 rgba(164, 115, 76, 0.24)',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Purchase orders"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<div style={{ color: '#B76935', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <Iconify icon="solar:cart-3-bold" width={36} height={36} />
            </div>}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #854C2A, #57301B)',
              color: '#fff',
              boxShadow: '0 8px 16px 0 rgba(133, 76, 42, 0.24)',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Messages"
            percent={3.6}
            total={234}
            color="warning"
            icon={<div style={{ color: '#B76935', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <Iconify icon="solar:chat-round-dots-bold" width={36} height={36} />
            </div>}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
            sx={{
              backgroundImage: 'linear-gradient(to bottom, #512E17, #2C1A0E)',
              color: '#fff',
              boxShadow: '0 8px 16px 0 rgba(81, 46, 23, 0.24)',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              colors: ['#B76935', '#512E17'],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
            sx={{
              boxShadow: '0 8px 16px 0 rgba(183, 105, 53, 0.12)',
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
