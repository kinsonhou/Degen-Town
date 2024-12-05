import { internal } from './_generated/api';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { DatabaseReader, internalMutation, mutation } from './_generated/server';
import { generateAgentMessage } from './agent';
import { messageValidator } from './schema';

export const agentGenerateMessage = mutation({
  args: { messages: v.array(messageValidator) },
  handler: async (ctx: MutationCtx, args: { messages: Message[] }) => {
    return await generateAgentMessage(args.messages, ctx.db);
  },
});
