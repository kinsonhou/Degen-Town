import { internal } from './_generated/api';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { DatabaseReader, internalMutation, MutationCtx } from './_generated/server';
import { generateAgentMessage } from './agent';
import type { Message } from './types';

export const agentGenerateMessage = internalMutation({
  args: { messages: v.array(v.any()) },
  handler: async (ctx: MutationCtx, args: { messages: Message[] }) => {
    return await generateAgentMessage(args.messages, ctx.db);
  },
});
