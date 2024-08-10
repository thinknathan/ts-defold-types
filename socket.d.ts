declare namespace socket {
	type Family = 'inet' | 'inet6';
	type Failure = string;
	type Table = object;
	type SuccessOrFailure<T> = LuaMultiReturn<
		[T | undefined, Failure | undefined]
	>;

	export const _VERSION: string;
	export const _DEBUG: boolean;
	export function connect(
		address: string,
		port: number,
		localAddress?: string,
		localPort?: number,
		family?: Family,
	): SuccessOrFailure<TCP>;
	export interface dns {
		getaddrinfo(address: string): SuccessOrFailure<Table>;
		gethostname(): string;
		getnameinfo(address: string): SuccessOrFailure<Table>;
		tohostname(
			address: string,
		): LuaMultiReturn<[string | undefined, Table | string]>;
		toip(address: string): LuaMultiReturn<[string | undefined, Table | string]>;
	}
	export function gettime(): number;
	export function newtry<F extends (...args: any[]) => any>(func: F): F;
	export function protect<F extends (...args: any[]) => any>(func: F): F;
	export function select(
		read: UDP[],
		write: UDP[],
		timeout?: number,
	): LuaMultiReturn<[UDP[], UDP[], string | undefined]>;
	export function select(
		read: TCP[],
		write: TCP[],
		timeout?: number,
	): LuaMultiReturn<[TCP[], TCP[], string | undefined]>;
	export function skip(count: number, ...args: any[]): LuaMultiReturn<any[]>;
	export function sleep(time: number): void;
	export function tcp(): SuccessOrFailure<TCP>;
	export function tcp6(): SuccessOrFailure<TCP>;
	export function udp(): SuccessOrFailure<UDP>;
	export function udp6(): SuccessOrFailure<UDP>;

	export class TCP {
		bind(port: number, address: string): void;
		close(): void;
		connect(address: string, port: number): LuaMultiReturn<[number, string]>;
		dirty(): unknown; //WIP
		getfd(): unknown; //WIP;
		getsockname(): LuaMultiReturn<[string, number]>;
		getstats(): LuaMultiReturn<[number, number, number]>;
		listen(port: number): LuaMultiReturn<[number, string]>;
		setfd(): unknown; //WIP;
		setstats(rx: number, tx: number, err: number): number;
		settimeout(timeout: number, mode: TCPTimeoutMode): void;

		// getpeername(): [string, number];
		// receive(
		// 	pattern: TCPReceivePattern | number,
		// 	buffer: string,
		// ): [string, TCPReceiveError];
		// send(
		// 	buffer: string,
		// 	offset: number,
		// 	length: number,
		// ): [number, string, number];
		// shutdown(mode: TCPShutdownMode): number;
		// accept(): [TCP, string];
		// setoption(option: TCPOption): number;
		// setoption(option: TCPLinger, value: TCPLingerOption): number;
	}

	export class UDP {
		close(): void;
		getpeername(): [string, number];
		getsockname(): [string, number];
		receive(bufferSize: number): LuaMultiReturn<[string, UDPTimeout]>;
		receivefrom(
			bufferSize: number,
		): LuaMultiReturn<[string, string, number, UDPTimeout]>;
		send(buffer: string): LuaMultiReturn<[number, string]>;
		sendto(
			buffer: string,
			address: string,
			port: number,
		): LuaMultiReturn<[number, string]>;
		setpeername(
			address: string,
			port: number,
		): LuaMultiReturn<[number, string]>;
		setsockname(
			address: string,
			port: number,
		): LuaMultiReturn<[number, string]>;
		setoption(
			option: UDPOptions,
			value: boolean,
		): LuaMultiReturn<[number, string]>;
		settimeout(timeout: number): void;
	}

	export interface TCPLingerOption {
		on: boolean;
		timeout: number;
	}

	export enum TCPReceivePattern {
		'*l',
		'*a',
	}

	export enum TCPReceiveError {
		'closed',
		'timeout',
	}

	export enum TCPShutdownMode {
		'both',
		'send',
		'receive',
	}

	export enum TCPOption {
		'keepalive',
		'reuseaddr',
		'tcp-nodelay',
	}

	export enum TCPLinger {
		'linger',
	}

	export enum TCPTimeoutMode {
		'b',
		't',
	}

	export enum UDPOptions {
		'dontroute',
		'broadcast',
	}

	export enum UDPTimeout {
		'timeout',
	}
}
