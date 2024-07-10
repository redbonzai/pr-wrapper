import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { Logger } from 'nestjs-pino';
import errorSerializer from '@libs/serializer/error.serializer';

@Controller('github/pull-request')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly logger: Logger,
  ) {}

  @Post('/')
  async createPullRequest(
    @Body('head') head: string,
    @Body('base') base: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ): Promise<void> {
    try {
      await this.githubService.createPullRequest(head, base, title, body);
    } catch (error) {
      const serializedError = errorSerializer(error);
      this.logger.error('Error creating pull request:', serializedError);
    }
  }

  @Post('/comment/:number')
  async commentOnPullRequest(
    @Param('number') pullRequestNumber: number,
    @Body('comment') comment: string,
    @Body('username') username: string,
    @Body('user-access-token') token: string,
  ): Promise<void> {
    try {
      await this.githubService.commentOnPullRequest(
        pullRequestNumber,
        comment,
        username,
        token,
      );
    } catch (error) {
      const serializedError = errorSerializer(error);
      this.logger.error('Error commenting on pull request:', serializedError);
    }
  }

  @Post('/request-changes/:number')
  async requestChangesOnPullRequest(
    @Param('number') pullRequestNumber: number,
    @Body('comment') comment: string,
    @Body('username') username: string,
    @Body('user-access-token') token: string,
  ): Promise<void> {
    try {
      await this.githubService.requestChangesOnPullRequest(
        pullRequestNumber,
        comment,
        username,
        token,
      );
    } catch (error) {
      const serializedError = errorSerializer(error);
      this.logger.error(
        'Error requesting changes on pull request:',
        serializedError,
      );
    }
  }
  // missing approve PR method.

  @Patch('/close/:number')
  async closePullRequest(
    @Param('number') pullRequestNumber: number,
  ): Promise<void> {
    try {
      await this.githubService.closePullRequest(pullRequestNumber);
    } catch (error) {
      const serializedError = errorSerializer(error);
      this.logger.error('Error closing pull request:', serializedError);
    }
  }
}
