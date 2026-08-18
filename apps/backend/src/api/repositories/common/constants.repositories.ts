import { Kysely, sql, Transaction } from "kysely";
import { Database } from "../../../db/types.js";
import { count } from "node:console";


class ConstantsRepositories{
    async getConstantsRepo (
        db:Kysely<Database>|Transaction<Database>,
        {
            eq_id,
            const_id,
            limit,
            offset,
            description_like,
            symbol_like,
            use_id
        }:{
            eq_id?:number|undefined,
            const_id?:number|undefined,
            limit?:number|undefined,
            offset?:number|undefined,
            description_like?:string|undefined
            symbol_like?:string|undefined
            use_id?:number|undefined
        }
    ):Promise<{
        const_id:number,
        constant_desc:string,
        default_value:number,
        index_year:number,
        symbol:string,
        use_id?:number,
        eq_id?:number
    }[]>{
        let constantsQuery =db.selectFrom('common.constants_table').select([
            "common.constants_table.const_id",
            'common.constants_table.constant_desc',
            'common.constants_table.default_value',
            'common.constants_table.index_year',
            'common.constants_table.symbol'])
        if (eq_id || use_id) {
            if (eq_id && use_id) {
                constantsQuery = constantsQuery
                    .innerJoin(
                        'municipal_qc.constant_use_table as cut',
                        'cut.const_id',
                        'common.constants_table.const_id'
                    ).where('cut.eq_id', '=', eq_id)
                    .where("cut.use_id", "=", use_id).select(['cut.use_id', 'cut.eq_id']);
            } else if (eq_id && !use_id) {
                constantsQuery = constantsQuery
                    .innerJoin(
                        'municipal_qc.constant_use_table as cut',
                        'cut.const_id',
                        'common.constants_table.const_id'
                    ).where('cut.eq_id', '=', eq_id).select(['cut.use_id', 'cut.eq_id']);
            } else if (use_id) { 
                constantsQuery = constantsQuery
                    .innerJoin(
                        'municipal_qc.constant_use_table as cut',
                        'cut.const_id',
                        'common.constants_table.const_id'
                    ).where('cut.use_id', '=', use_id).select(['cut.use_id', 'cut.eq_id']);
            }
        }
        if (const_id){
            constantsQuery= constantsQuery.where('common.constants_table.const_id','=',const_id)
        }
        if ((limit!==undefined)&&(offset!==undefined)){
            constantsQuery= constantsQuery.limit(limit).offset(offset)
        }
        if (description_like){
            constantsQuery= constantsQuery.where('common.constants_table.constant_desc','like','%'+description_like+'%' )
        }
        if (symbol_like){
            constantsQuery= constantsQuery.where('common.constants_table.symbol','like','%'+symbol_like+'%')
        }
        const data = await constantsQuery.execute()
        return data
    }

    async getConstantsCountRepo (
        db:Kysely<Database>|Transaction<Database>,
        {
            eq_id,
            const_id,
            description_like,
            symbol_like
        }:{
            eq_id?:number|undefined,
            const_id?:number|undefined,
            description_like?:string|undefined
            symbol_like?:string|undefined
        }
    ){
        let countQuery= db.selectFrom('common.constants_table').select(sql<number|null>`count(*)`.as('count'))
        if (eq_id){
             countQuery = countQuery
                .innerJoin(
                    'municipal_qc.constant_use_table as cut',
                    'cut.const_id',
                    'common.constants_table.const_id'
                )
                .where('cut.eq_id', '=', eq_id);
        }
        if (const_id){
            countQuery= countQuery.where('common.constants_table.const_id','=',const_id)
        }

        if (description_like!==undefined){
            countQuery= countQuery.where('common.constants_table.constant_desc','like','%'+description_like+'%'  )
        }
        if (symbol_like!==undefined){
            countQuery= countQuery.where('common.constants_table.symbol','like','%'+symbol_like+'%')
        }
        const data = (await countQuery.execute()) as {count:number}[]
        return data
    }

    async createConstantsRepo(
        db:Kysely<Database>|Transaction<Database>,
        {
            constant_desc,
            default_value,
            index_year,
            symbol
        }:{
            constant_desc:string,
            default_value:number,
            index_year:number,
            symbol:string
        }
    ){
        const constInsert= db.insertInto('common.constants_table')
                                        .values({
                                            constant_desc:constant_desc,
                                            default_value:default_value,
                                            index_year:index_year,
                                            symbol:symbol
                                        }).returningAll().execute()
        return constInsert
    }

    async updateConstantsRepo(
        db:Kysely<Database>|Transaction<Database>,
        {
            const_id,
            constant_desc,
            default_value,
            index_year,
            symbol
        }:{
            const_id:number,
            constant_desc:string,
            default_value:number,
            index_year:number,
            symbol:string
        }
    ){
        const constUpdated= db.updateTable('common.constants_table')
                                        .set({
                                            constant_desc:constant_desc,
                                            default_value:default_value,
                                            index_year:index_year,
                                            symbol:symbol
                                        }).where('common.constants_table.const_id','=',const_id)
                                        .returningAll()
                                        .executeTakeFirst()
        return constUpdated
    }
    async deleteConstantRepo(db:Kysely<Database>|Transaction<Database>,id:number){
        const constDeleted=db.deleteFrom('common.constants_table')
                                .where('common.constants_table.const_id','=',id)
                                .returningAll()
                                .executeTakeFirst()
        return constDeleted
    }
}

export const constantsRepositories = new ConstantsRepositories()