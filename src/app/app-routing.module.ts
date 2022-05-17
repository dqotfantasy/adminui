import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PromoterIncomeModule } from './promoter/promoter-income/promoter-income.module';
import { PromoterModule } from './promoter/promoter.module';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password/:token',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'wallet',
    loadChildren: () => import('./users/wallet/wallet.module').then(m => m.WalletModule),
  },
  {
    path: 'competitions',
    loadChildren: () => import('./competitions/competitions.module').then(m => m.CompetitionsModule),
  },
  {
    path: 'fixtures',
    loadChildren: () => import('./fixtures/fixtures.module').then(m => m.FixturesModule),
  },
  {
    path: 'contests',
    loadChildren: () => import('./contests/contests.module').then(m => m.ContestsModule),
  },
  {
    path: 'contest-categories',
    loadChildren: () => import('./contest-categories/contest-categories.module').then(m => m.ContestCategoriesModule),
  },
  // {
  //   path: 'players',
  //   loadChildren: () => import('./players/players.module').then(m => m.PlayersModule),
  // },
  {
    path: 'states',
    loadChildren: () => import('./states/states.module').then(m => m.StatesModule),
  },
  {
    path: 'fantasy-points',
    loadChildren: () => import('./fantasy-points/fantasy-points.module').then(m => m.FantasyPointsModule),
  },
  {
    path: 'rank-categories',
    loadChildren: () => import('./rank-categories/rank-categories.module').then(m => m.RankCategoriesModule),
  },
  {
    path: 'contest-templates',
    loadChildren: () => import('./contest-templates/contest-templates.module').then(m => m.ContestTemplatesModule),
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
  },
  {
    path: 'withdrawals',
    loadChildren: () => import('./withdrawls/withdrawls.module').then(m => m.WithdrawlsModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'banners',
    loadChildren: () => import('./banners/banners.module').then(m => m.BannersModule),
  },
  {
    path: 'blogs',
    loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule),
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
  },
  {
    path: 'winners',
    loadChildren: () => import('./winners/winners.module').then(m => m.WinnersModule),
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule),
  },
  {
    path: 'private-contests',
    loadChildren: () => import('./private-contests/private-contests.module').then(m => m.PrivateContestsModule),
  },
  {
    path: 'coupons',
    loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule),
  },
  {
    path: 'tds',
    loadChildren: () => import('./tds/tds.module').then(m => m.TdsModule),
  },
  {
    path: 'add-contest-templates/:fixtureId',
    loadChildren: () => import('./add-contest-templates/add-contest-templates.module').then(m => m.AddContestTemplatesModule),
  },
  {
    path: 'system-user/:fixtureId',
    loadChildren: () => import('./system-user/system-user.module').then(m => m.SystemUserModule),
  },
  {
    path: 'edit-team/:fixtureId/:contest_id/:user_teams_id',
    loadChildren: () => import('./system-user/edit-team/edit-team.module').then(m => m.EditTeamModule),
  },
  {
    path: 'leaderboard/:competitionId',
    loadChildren: () => import('./competitions/leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
  },
  {
    path: 'viewcron/:fixtureId',
    loadChildren: () => import('./fixtures/viewcron/viewcron-routing.module').then(m => m.ViewcronRoutingModule),
  },
  {
    path: 'earning-manager',
    loadChildren: () => import('./earning-manager/earning-manager.module').then(m => m.EarningManagerModule),
  },
  {
    path: 'subadmin-create', loadChildren: () => import('./subadmin-create/subadmin-create.module').then(m => m.SubadminCreateModule)
  },
  {
    path: 'listsystem-user',
    loadChildren:() =>import('./listsystem-user/listsystem-user.module').then(m => m.ListsystemUserModule)
  },
  {
    path: 'join-user/:fixtureId',
    loadChildren: () => import('./join-user/join-user.module').then(m => m.JoinUserModule),
  },
  {
    path: 'referal-userlist',
    loadChildren:() =>import('./referal-userlist/referal-userlist.module').then(m => m.ReferalUserlistModule),
  },
  {
    path: 'promoter-referral-info',
    loadChildren:() =>import('./promoter/promoter.module').then(m => PromoterModule),
  },
  {
    path: 'promoter-income-info',
    loadChildren:() =>import('./promoter/promoter-income/promoter-income.module').then(m => PromoterIncomeModule),
  },
  {
    path: 'leaderboard-details/:leaderboardId',
    loadChildren: () => import('./competitions/leaderboard/leaderboard-details/leaderboard-details.module').then(m => m.LeaderboardDetailsModule),
  },
  {
    path: 'all-viewcron',
    loadChildren: () => import('./fixtures/all-viewcron/all-viewcron-routing.module').then(m => m.AllViewcronRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
