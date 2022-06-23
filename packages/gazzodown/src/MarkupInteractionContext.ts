import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { createContext, UIEvent } from 'react';

export type UserMention = Pick<IUser, '_id' | 'username' | 'name'>;
export type ChannelMention = Pick<IRoom, '_id' | 'name'>;

type MarkupInteractionContextValue = {
	highlights?:
		| {
				highlight: string;
				regex: RegExp;
				urlRegex: RegExp;
		  }[];
	baseURI?: string;
	getEmojiClassNameAndDataTitle?: (emoji: string) => {
		'className'?: string;
		'name': string;
		'data-title'?: string;
		'children'?: string;
		'image'?: string;
	};
	highlightWords?: (msg: any, highlights: any) => any;
	resolveUserMention?: (mention: string) => UserMention | undefined;
	onUserMentionClick?: (mentionedUser: UserMention) => ((e: UIEvent) => void) | undefined;
	resolveChannelMention?: (mention: string) => ChannelMention | undefined;
	onChannelMentionClick?: (mentionedChannel: ChannelMention) => ((e: UIEvent) => void) | undefined;
};

export const MarkupInteractionContext = createContext<MarkupInteractionContextValue>({});
