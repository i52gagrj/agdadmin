export class Cliente{
	constructor(
		public id: number,		
		public nombre: string,
        public email: string,
        public password: string,
        public admin: number,		
        public isadmin: boolean,
		public fechaalta		
	){}
}