import { internal } from './_generated/api';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';
import { DatabaseReader, internalMutation } from './_generated/server';
import { generateAgentMessage } from './agent';

export const agentGenerateMessage = internalMutation({
  args: {
    messages: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    return await generateAgentMessage(args.messages, ctx);
  },
});
