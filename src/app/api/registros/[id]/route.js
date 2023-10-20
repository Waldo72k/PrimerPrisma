import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET(request,{params: {id}}) {
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
             id: Number(id)
            }
         })

         if(!estudiante){
            return NextResponse.json(
                {mensaje: 'El estudiante no existe'},
                {status: 404}
            )
         }

         return NextResponse.json(estudiante)
    } catch (error) {
        if(error instanceof Error)
            return NextResponse.json(error.message,{status: 500})
    }
}

export async function DELETE(request) {
    return NextResponse.json({
        mensaje: 'Eliminando un estudiante'
    })
}

export async function PUT(request) {
    return NextResponse.json({
        mensaje: 'Actualizando un estudiante'
    })
}
